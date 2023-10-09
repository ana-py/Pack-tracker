from typing import Annotated
from fastapi import APIRouter, Depends, Header, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from jwt import decode
from config.connection import db
from middlewares.jwt_bearer import JWTBearer
from schemas.package import Package
from bson import ObjectId
from utils.jwt_manager import validate_token

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
    db.packages.insert_one(package_data)
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
    result = db.packages.find({"status_list.status":{"$ne": "delivered"}, "deliveryman.user_id": id})
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

