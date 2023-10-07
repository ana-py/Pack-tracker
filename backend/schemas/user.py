from typing import Optional
from pydantic import BaseModel
class LoginCredentials(BaseModel):
    email: str
    password: str
class User(BaseModel):
    username: str
    password: str
    email: str
    name: str
    role: str
