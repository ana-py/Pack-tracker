from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from config.connection import db
from schemas.package import Package
from bson import ObjectId

package_router = APIRouter()

@package_router.get("/package")
def get_packages():
    result = db.packages.find()
    result_list = list(result)
    for item in result_list:
        item['_id'] = str(item['_id'])
    return JSONResponse(status_code=200, content=jsonable_encoder(result_list))

@package_router.get("/package/{id}")
def get_package(id: str):
    result = db.packages.find_one({"_id": ObjectId(id)})
    result['_id'] = str(result['_id'])
    if not result:
        return JSONResponse(status_code=404, content={"message": "Package not found"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))

@package_router.post("/package")
def add_package(package: Package):
    package_add = package.dict()
    db.packages.insert_one(package_add)
    return JSONResponse(status_code=200, content={"message": "Package added successfully"}) 