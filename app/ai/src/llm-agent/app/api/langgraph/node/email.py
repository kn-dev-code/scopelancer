from langchain_core.messages import SystemMessage, HumanMessage
from app.core.llms import haiku_email_llm
from state import State

async def email(state: State) -> dict:
    system_message = f"""
    You are an email archiect for the app Scopelancer. You will be given a transcribed text as followed: 
    {state.get("transcribe")}. If the transcribed text is empty, you are permitted to use one of Python's value error to send out a message("No audio path found.").
    When you read the text, you will construct a simple professional email to the client if the user selects this option. 

    3 CRITICAL RULES:

    1. ONLY USE THE TRANSCRIBED TEXT FOR YOUR EMAIL INPUT
    2. ALLOW THE USER TO REVIEW AND REVISE THE EMAIL INPUT YOU'VE CREATED
    3. IF USER IS SATISFIED WITH EMAIL INPUT, YOU WILL BE PERMITTED TO SEND EMAIL INPUT ALONG WITH 
    THE REST OF THE OPTIONAL PAYLOADS (E.G. {state.get("flow_diagram"), state.get("scope_document")}), etc.
    """
    response = await haiku_email_llm.ainvoke([
        SystemMessage(context=system_message)
    ])
    