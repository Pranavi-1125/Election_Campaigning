from twilio_client import make_call


def start_call(phone_number):
    return make_call(phone_number)


# Temporary mock transcription
def transcribe(audio_url):

    print("Processing audio from:", audio_url)

    return "I support your candidate"


# Temporary mock AI analysis
def analyze(text):

    return {
        "sentiment": "Supporter",
        "intent": "Support",
        "response": "Thank you for your support"
    }