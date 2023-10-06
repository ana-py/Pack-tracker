from pydantic import BaseModel
from typing import Optional
from .route import Route
from .receiver import Receiver

class Package(BaseModel):
    description: str 
    size: str
    status: list[str]   
    sender: str
    receiver_info: Receiver
    send_date: str
    received_date: str
    route_list: list[Route]