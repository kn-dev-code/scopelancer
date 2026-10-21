from langchain_core.messages import SystemMessage, HumanMessage
from app.core.llms import haiku_email_llm
from langgraph.messages.system_prompts import email_system_prompt
from langgraph.types import interrupt, Command
from state import State

async def email(state: State) -> dict:
    audio_file = state.get("transcribe")
    if not audio_file or audio_file == None:
        raise ValueError("No audio path found.")

    user_message = state.get("context", "")
    response = await haiku_email_llm.ainvoke([
        SystemMessage(context=email_system_prompt),
        HumanMessage(context=user_message)
    ])
    email_draft = response.content

    user_revised_email = interrupt({
        "status": "AWAITING HUMAN REVIEW",
        "email": email_draft
    })

    return {"email": user_revised_email}
    