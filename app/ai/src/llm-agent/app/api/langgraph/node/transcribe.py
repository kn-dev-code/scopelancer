from api.langgraph.state import State
import whisper

local_whisper_model = whisper.load_model("small")

def transcribe_file(state: State) -> dict:
    audio_path = state["clientFile"]
    if not audio_path or audio_path.isspace():
        raise ValueError("Cannot have an empty audio_path")
    
    results = local_whisper_model.transcribe(audio_path)
    transcribed_text = results["text"]

    return {
        "transcript": transcribed_text,
        "messages": [("user", transcribed_text)]
    }