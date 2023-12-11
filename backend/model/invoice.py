from pydantic import BaseModel

class Invoice(BaseModel):
    complaint_id:str
    user_id:str
    serviceProvider_id:str
    cost:str
    year:str