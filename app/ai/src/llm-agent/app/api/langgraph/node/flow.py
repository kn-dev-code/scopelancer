from state import State
from langchain_core.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv
from langgraph.types import interrupt
from langgraph.messages.system_prompts import flow_system_prompt
from app.core.llms import haiku_flow_llm\

load_dotenv()


async def flow(state: State) -> dict:
    audio_text = state.get("transcribe")
    user_context = state.get("context")
    if not audio_text or audio_text == None:
        raise ValueError("No audio path found")
    
    user_message = f"Context: {user_context}\n\nTranscript:\n"

    response = await haiku_flow_llm.ainvoke([
        SystemMessage(context=flow_system_prompt),
        HumanMessage(context=user_message)
    ])

    generated_diagram = response.content

    user_revised_diagram = interrupt({
        "status": "AWAITING HUMAN REVIEW",
        "diagram": generated_diagram
    })

    return {
        "user_diagram": user_revised_diagram
    }