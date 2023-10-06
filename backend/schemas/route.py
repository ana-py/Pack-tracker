from pydantic import BaseModel
from typing import Optional

class Route(BaseModel):
    id: Optional[int] = None
    package_id: int
    location: str
    date: str