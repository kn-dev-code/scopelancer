from app.api.langgraph.state import GraphState
from langgraph.graph import StateGraph, START, END
from app.api.langgraph import State
from app.api.langgraph.node import (transcribe_node, scope_doc_node, flow_diagram_node, email_node)
builder = StateGraph(GraphState)

builder.add_node("transcribe", transcribe_node)
builder.add_node("scope-document", scope_doc_node)
builder.add_node("flow-diagram", flow_diagram_node)
builder.add_node("email", email_node)

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

# setup routes
# route functions