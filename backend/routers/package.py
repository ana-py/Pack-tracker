from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from config.connection import db
from middlewares.jwt_bearer import JWTBearer
from schemas.package import Package
from bson import ObjectId

package_router = APIRouter()

@package_router.get("/packages", dependencies=[Depends(JWTBearer)])
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

@package_router.post("/packages", dependencies=[Depends(JWTBearer)])
def add_package(package: Package):
    package_data = package.dict()
    db.packages.insert_one(package_data)
    return JSONResponse(status_code=200, content={"message": "Package added successfully"}) 

@package_router.put("/packages/{id}", dependencies=[Depends(JWTBearer)])
def update_package(id: str, package: Package):
    result = get_package(id)
    
    if not result:
        return JSONResponse(status_code=404, content={"message": "Package not found"})
    for key, value in package.dict().items():
        db.packages.update_one({"_id": ObjectId(id)}, {"$set": {key : value}})
        
    return JSONResponse(status_code=200, content={"message": "Package updated successfully"})


