from pydantic import BaseModel
from typing import Optional

class Receiver(BaseModel):
    package_id: int
    name: str
    address: str
    email: str
    token: str