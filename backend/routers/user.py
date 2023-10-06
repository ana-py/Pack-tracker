from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from middlewares.jwt_bearer import JWTBearer
from utils.jwt_manager import create_token, validate_token
from schemas.user import User
from config.connection import db

user_router = APIRouter()

@user_router.post('/login')
def login(user: User):
    result = db.users.find_one({"email": user.email})
    if not result:
        return JSONResponse(status_code=404, content={"message": "User not found"})
    if user.email == result['email'] and user.password == result['password']:
        result['_id'] = str(result['_id'])
        result.pop('password', None)
        result['token'] = create_token(result)
        return JSONResponse(status_code=200, content=result)
    return JSONResponse(status_code=403, content={"message": "Invalid credentials"})

@user_router.post('/users', dependencies=[Depends(JWTBearer)])
def create_user(user: User):
    user_data = user.dict()
    db.users.insert_one(user_data)
    return JSONResponse(status_code=200, content={"message": "User added successfully"})

@user_router.get('/users', dependencies=[Depends(JWTBearer)])
def get_users():
    result = db.users.find()
    result_list = list(result)
    for item in result_list:
        item['_id'] = str(item['_id'])
    return JSONResponse(status_code=200, content=result_list)




