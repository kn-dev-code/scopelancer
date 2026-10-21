from api.langgraph.state import State
from langchain_core.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv
from app.core.llms import sonnet_scope_llm
from langgraph.messages.system_prompts import scope_system_message
load_dotenv()


async def scope_document(state: State) -> dict:
    context_message = state.get("context", "")
    audio_text = state.get("transcribe")

    if not audio_text or audio_text == None:
        raise ValueError("No audio path found.")
    

    user_message = f"Context: {context_message}\n\nTranscript:\n{audio_text}"


    response = await sonnet_scope_llm.ainvoke([
        SystemMessage(context=scope_system_message),
        HumanMessage(context=user_message)
    ])

    return response
    
