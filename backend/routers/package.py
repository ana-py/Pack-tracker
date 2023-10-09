from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from config.connection import db
from middlewares.jwt_bearer import JWTBearer
from schemas.package import Package, Status, Route
from bson import ObjectId
from datetime import datetime

package_router = APIRouter()

@package_router.get("/packages", dependencies=[Depends(JWTBearer())])
def get_packages():
    result = db.packages.find()
    result_list = list(result)
    for item in result_list:
        item['_id'] = str(item['_id'])
    return JSONResponse(status_code=200, content=jsonable_encoder(result_list))

@package_router.get("/packages/{id}")
def get_package(id: str):
    result = db.packages.find_one({"_id": ObjectId(id)})
    result['_id'] = str(result['_id'])
    if not result:
        return JSONResponse(status_code=404, content={"message": "Package not found"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@package_router.post("/packages", dependencies=[Depends(JWTBearer())])
def add_package(package: Package):
    package_data = package.model_dump()
    result = db.packages.insert_one(package_data)
    sent = send_email({"id": result.inserted_id, **package_data})
    if not sent:
        return JSONResponse(status_code=500, content={"message": "Failed to send email"})
    return JSONResponse(status_code=200, content={"message": "Package added successfully"})

@package_router.put("/packages/{id}", dependencies=[Depends(JWTBearer())])
def update_package(id: str, package: Package):
    result = get_package(id)
    if not result:
        return JSONResponse(status_code=404, content={"message": "Package not found"})
    for key, value in package.model_dump().items():
        db.packages.update_one({"_id": ObjectId(id)}, {"$set": {key : value}})
    return JSONResponse(status_code=200, content={"message": "Package updated successfully"})


@package_router.get("/packages/deliverymen/{id}", dependencies=[Depends(JWTBearer())])
def get_active_packages(id: str):
    result = db.packages.find({"deliveryman.user_id": id, "received_date": None})
    result_list = list(result)
    for item in result_list:
        item['_id'] = str(item['_id'])
    return JSONResponse(status_code=200, content=jsonable_encoder(result_list))

@package_router.get("/packages_by_date", dependencies=[Depends(JWTBearer())])
def get_packages_by_date(date: str):
    result = db.packages.find({"shipment_date": date})
    result_list = list(result)
    print(result_list)
    for item in result_list:
        item['_id'] = str(item['_id'])
    return JSONResponse(status_code=200, content=jsonable_encoder(result_list))

@package_router.put("/packages/update_status/{id}", dependencies=[Depends(JWTBearer())])
def update_status(id: str, new_status: Status):
    status = new_status.model_dump()
    db.packages.update_one(
        {"_id": ObjectId(id)},
        {"$push": {"status_list": status}})
    package = db.packages.find_one({"_id": ObjectId(id)})
    sent = send_email(package)
    if not sent:
        return JSONResponse(status_code=500, content={"message": "Error sending email notification to receiver"})
    return JSONResponse(status_code=200, content={"message": "Status updated successfully"})

@package_router.put("/packages/register_location/{id}", dependencies=[Depends(JWTBearer())])
def update_location(id: str, new_location: Route):
    result = get_package(id)
    location = new_location.model_dump()
    if not result:
        return JSONResponse(status_code=404, content={"message": "Package not found"})
    db.packages.update_one(
        {"_id": ObjectId(id)},
        {"$push": {"route_list": location}})
    return JSONResponse(status_code=200, content={"message": "Location updated successfully"})

@package_router.put("/public/packages/certificate/{id}")
def certificate_package(id: str):
    db.packages.update_one({"_id": ObjectId(id)}, {"$set": {"received_date": datetime.now()}})
    result = db.packages.find_one({"_id": ObjectId(id)})
    result['_id'] = str(result['_id'])
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

def send_email(package: Package):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = 'apppacktracker@gmail.com'
    smtp_password = 'okjdeyacbofrxdel'

    msg = MIMEMultipart()
    msg['Subject'] = "Package Status Update"
    msg['From'] = smtp_username
    msg['To'] = package['receiver_info']['email']

    email_body = f"""
    <html>
    <head>
        <style>
            .button {{
                background-color: #4CAF50;
                border: none;
                border-radius: 5px;
                color: white;
                padding: 5px 10px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
            }}
        </style>
    </head>
    <body>
        <p>Hello,</p>
        <p>The package with tracking number {package['_id']} has a new status.</p>
        <p>Current status: {package['status_list'][-1]['status']}</p>
        <p>It will be delivered to {package['receiver_info']['name']} at {package['receiver_info']['address']}.</p>
        <p>The package is currently at {package['route_list'][-1]['location']}.</p>
        <p>You can view the package details below:</p>
        <form action="http://localhost:4200/packages/packageDetails/{package['_id']}" method="get">
            <button class="button" type="submit">View Package Details</button>
        </form>
    </body>
    </html>
    """
    msg.attach(MIMEText(email_body, 'html'))
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(smtp_username, package['receiver_info']['email'], msg.as_string())
        server.quit()
        return True
    except Exception as e:
        return False