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
        prompt = f"""
        Analyze the voter conversation below.

        Return ONLY valid JSON in this exact format:

{{
    "sentiment": "",
    "intent": "",
    "issues": [],
    "confidence": 0.0,
    "response": ""
}}

Rules:
- sentiment must be ONLY one of:
  - Supporter
  - Neutral
  - Opposed

- intent must be short and simple

- issues must contain only key issues

- confidence must be between 0 and 1

- response should be a short polite reply

        Conversation:
        {data.transcript}
        """

        # Send request to Groq model
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
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