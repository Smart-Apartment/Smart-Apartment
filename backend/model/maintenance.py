from pydantic import BaseModel

class Maintanence(BaseModel):
  year:str
  quaterly:str
  half:str
  yearly:str
  sqft:int
  otherExpenses:int
  psqftQuaterly:int
  psqftHalf:int
  psqftYearly:int
  totalCostPerSquareFeet:int