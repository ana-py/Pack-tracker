from pydantic import BaseModel
from typing import List, Optional

class Receiver(BaseModel):
    name: str
    address: str
    email: str

class Route(BaseModel):
    id: Optional[str] = None
    location: str
    date: str

class Deliveryman(BaseModel):
    user_id: str
    name: str

class Package(BaseModel):
    description: str 
    size: str
    sender: str
    receiver_info: Receiver
    send_date: str
    status: List[str]  
    route_list: List[Route]
    deliveryman: Optional[str] = None
    received_date: Optional[str] = None


