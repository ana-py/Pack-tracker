from pydantic import BaseModel
from typing import List, Optional

class Receiver(BaseModel):
    name:       str
    address:    str
    email:      str

class Route(BaseModel):
    location:   str
    date:       str

class Deliveryman(BaseModel):
    user_id:    Optional[str] = None
    name:       str

class Status(BaseModel):
    status:     str
    date:       str

class Package(BaseModel):
    id:             Optional[str] = None
    description:    str 
    size:           str
    sender:         str
    receiver_info:  Receiver
    shipment_date:  str
    status_list:    List[Status]  
    route_list:     List[Route]
    deliveryman:    Optional[Deliveryman] = None
    received_date:  Optional[str] = None


