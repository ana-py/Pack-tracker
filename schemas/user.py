from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    username: Optional[str] = None
    password: str
    email: str
    name: Optional[str] = None
    role: str