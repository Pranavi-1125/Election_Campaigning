from fastapi import FastAPI
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI()

# Initialize Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)
test_cases = [
    "Water problem is high and current MLA did nothing",
    "Roads improved a lot. I support your candidate",
    "I will decide after hearing manifesto",
    "No jobs for youth in our area",
    "Current government is doing good work",
    "maa area lo water problem ekkuva",
    "current MLA emi cheyyatledu"
]

# Input structure
class TranscriptInput(BaseModel):
    transcript: str


# Health check endpoint
@app.get("/")
def home():
    return {"message": "NLP Service Running"}


# NLP analysis endpoint
@app.post("/analyze-text")
def analyze_text(data: TranscriptInput):
    try:
        SYSTEM_PROMPT = """
You are an AI Election campaign agent.

Analyze the voter response and return ONLY valid JSON.

{
    "sentiment": "Supporter | Neutral | Opposed",
    "intent": "Complaint | Support | Query | Undecided",
    "issues": [],
    "response_text": "",
    "confidence": 0.0,
    "summary": ""
}

Rules:
- Return only JSON
- No markdown
- No explanation
- confidence must be between 0 and 1
- Detect issue categories properly
"""

        # Send request to Groq model
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
    {
        "role": "system",
        "content": SYSTEM_PROMPT
    },
    {
        "role": "user",
        "content": data.transcript
    }
]
        )

        # Get model output
        output = response.choices[0].message.content

        # Clean markdown formatting if present
        cleaned_output = (
            output
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        # Convert string to JSON
        result = json.loads(cleaned_output)

        return result

    except Exception as e:
        return {"error": str(e)}