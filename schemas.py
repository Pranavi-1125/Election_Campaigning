from pydantic import BaseModel

class CampaignCreate(BaseModel):
    name: str
    phone_number: str

class CampaignResponse(BaseModel):
    id: int
    name: str
    phone_number: str
    status: str

    class Config:
        from_attributes = True