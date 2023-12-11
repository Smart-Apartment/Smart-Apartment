from pydantic import BaseModel

class Visitor(BaseModel):
  check_in_time: str
  FullName: str
  flatno: int
  phoneNumber: str
  Date: str
  Time: str
  Purpose:str
  qrTime: str
  id: str
  check_out_time:object
