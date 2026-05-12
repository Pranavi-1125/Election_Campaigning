from fastapi import APIRouter
from pydantic import BaseModel
from voice_service import start_call

router = APIRouter()


class CampaignCreate(BaseModel):
    name: str
    phone_number: str


@router.post("/campaign/start")
def start_campaign(data: CampaignCreate):

    try:

        print("API HIT SUCCESSFULLY")

        call_sid = start_call(data.phone_number)

        print("CALL SID:", call_sid)

        return {
            "message": "Call started",
            "sid": call_sid
        }

    except Exception as e:

        print("ERROR:", str(e))

        return {
            "error": str(e)
        }