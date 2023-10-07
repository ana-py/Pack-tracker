from pydantic import BaseModel
from typing import Optional
from .receiver import Receiver

class deliveryman(BaseModel):
    id: Optional[int] = None
    name: str

class Route(BaseModel):
    id: Optional[int] = None
    package_id: int
    location: str
    date: str

class Receiver(BaseModel):
    package_id: int
    name: str
    address: str
    email: str
    token: str    

class Package(BaseModel):
    description: str 
    size: str
    status: list[str]   
    sender: str
    receiver_info: Receiver
    send_date: str
    received_date: str
    deliveryman: str
    route_list: list[Route]


