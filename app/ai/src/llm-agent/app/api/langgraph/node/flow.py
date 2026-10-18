from state import State
from langchain_anthropic import ChatAnthropic
from langchain_core.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv


load_dotenv()

local_haiku_agent = ChatAnthropic(
    model="claude-haiku-3-5",
    extra_body={"effort": "medium"}
)

def flow(state: State) -> dict:
    audio_text = state.get("transcribe")
    user_context = state.get("context")
    if not audio_text or audio_text == None:
        raise ValueError("No audio path found")
    
    system_message = "You are an expert systems analyst. Your job is to analyze the user's transcribed audio and convert the described workflow, architecture, or sequence into a valid Mermaid.js diagram. CRITICAL RULES:1. Output ONLY the raw Mermaid syntax inside a standard '```mermaid' markdown block. 2. Do not include any introductory text, explanations, or concluding remarks. 3. Ensure all node IDs are alphanumeric and do not contain special characters or spaces (use text labels instead, e.g., A[My Text Node]). 4. Use standard flowcharts (graph TD or graph LR) unless a sequence diagram (sequenceDiagram) is explicitly described."
    user_message = f"Context: {user_context}\n\nTranscript:\n"