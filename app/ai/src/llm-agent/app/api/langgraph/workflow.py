from app.api.langgraph.state import GraphState
from langgraph.graph import StateGraph

builder = StateGraph(GraphState)

builder.add_node("transcribe", transcribe_node)
builder.add_node("scope-document", scope_doc_node)
builder.add_node("flow-diagram", flow_diagram_node)
builder.add_node("email", email_node)

# Conditions for edging
