from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Receiver(BaseModel):
    name: str
    address: str
    email: str

class Route(BaseModel):
    id: Optional[str] = None
    location: str
    date: str

class Deliveryman(BaseModel):
    user_id: Optional[str] = None
    name: str

class Status(BaseModel):
    status: str
    date: datetime

class Package(BaseModel):
    description: str 
    size: str
    sender: str
    receiver_info: Receiver
    shipment_date: datetime
    status_list: List[Status]  
    route_list: List[Route]
    deliveryman: Optional[Deliveryman] = None
    received_date: Optional[str] = None


