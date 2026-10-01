from typing import TypedDict, Optional, List


class State(TypedDict):
    audio_id: str
    clientFile: str
    sessionTitle: str
    context: str
    selected_deliverables: List[str]
    email_type: Optional[str]
    user_id: str

    transcribe: Optional[str]
    scope_document: Optional[str]
    flow_diagram: Optional[str]
    email_type: Optional[str]



