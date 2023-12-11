from pydantic import BaseModel
import uuid
from typing import Optional


class COMPLAINTS(BaseModel):
    id: str = str(uuid.uuid4())  
    name: str
    date: str
    time: str
    position: str
    person: str
    description: str
    severity:Optional[str]=None
    status:str="Pending"
    flat_no:int