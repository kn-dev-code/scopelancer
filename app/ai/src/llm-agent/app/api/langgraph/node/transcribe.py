from state import State
from openai import OpenAI
from dotenv import load_dotenv


load_dotenv()

whisper_model_key = OpenAI()

if not whisper_model_key:
    raise ValueError("No key found.")


def transcribe_file(state: State) -> dict:
    audio_file = state.get("clientFile")
    if not audio_file or audio_file.isspace():
        raise ValueError("Cannot have an empty audio_path")
    
    transcribe = whisper_model_key.audio.transcriptions.create(
        model = "gpt-transcribe",
        file = audio_file
    )

    return {
        "transcript": transcribe,
        "messages": [("User's transcribed text: \n", transcribe)]
    }