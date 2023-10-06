from pydantic import BaseModel
from typing import Optional
from .route import Route

class Package(BaseModel):
    id: Optional[int] = None
    description: str 
    size: str
    status: list[str]   
    sender: str
    receiver: str
    receiver_address: str
    receiver_email: str
    send_date: str
    received_date: str
    route_list: list[Route] = []
    