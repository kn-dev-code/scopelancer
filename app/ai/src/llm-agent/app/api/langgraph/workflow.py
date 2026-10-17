from app.api.langgraph.state import GraphState
from langgraph.graph import StateGraph, START, END
from app.api.langgraph import State
from app.api.langgraph.node import (transcribe, email, flow, scope)
from langgraph.checkpoint.memory import MemorySaver
builder = StateGraph(GraphState)

builder.add_node("transcribe", transcribe)
builder.add_node("scope-document", scope)
builder.add_node("flow-diagram", flow)
builder.add_node("email", email)

# Conditions for edging
def router_edges(state: State) -> str:
    deliverables = state.get("selected_deliverables", [])
    if "SCOPEDOCUMENT" in deliverables and state.get("scope_document") is None:
        return "scope_document"
    if "FLOWDIAGRAM" in deliverables and state.get("flow_diagram") is None:
        return "flow_diagram"
    if "EMAIL" in deliverables and state.get("email") is None:
        return "email"

    return END

builder.add_edge(START, "transcribe")

path_map = {
    "scope_document": "scope_document",
    "flow_diagram": "flow_diagram",
    "email": "email",
    END: END
}

builder.add_conditional_edges("transcribe", router_edges, path_map)
builder.add_conditional_edges("scope_document", router_edges, path_map)
builder.add_conditional_edges("flow_diagram", router_edges, path_map)
builder.add_conditional_edges("email", router_edges, path_map)


memory = MemorySaver()
langgraph_app = builder.compile(checkpointer=memory)