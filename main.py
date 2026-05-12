from fastapi import FastAPI, Request
from fastapi.responses import Response

from campaign import router as campaign_router
from voice_service import transcribe, analyze

app = FastAPI()

app.include_router(campaign_router)


@app.get("/")
def home():
    return {"message": "Backend running 🚀"}


# Twilio instructions route
@app.post("/twiml")
def twiml_response():

    xml_response = """
    <Response>

        <Say>
            Hello, this is an AI election campaign call.
        </Say>

        <Record
            maxLength="10"
            action="/webhook/twilio-audio"
            method="POST"
        />

    </Response>
    """

    return Response(
        content=xml_response,
        media_type="application/xml"
    )


# Twilio webhook route
@app.post("/webhook/twilio-audio")
async def receive_audio(request: Request):

    form_data = await request.form()

    recording_url = form_data.get("RecordingUrl")

    print("Recording URL:", recording_url)

    transcript = transcribe(recording_url)

    print("Transcript:", transcript)

    analysis = analyze(transcript)

    print("Analysis:", analysis)

    return {
        "transcript": transcript,
        "analysis": analysis
    }