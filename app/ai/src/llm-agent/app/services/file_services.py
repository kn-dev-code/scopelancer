from fastapi import FastAPI, HTTPException, Request, Depends, status
from app.util.auth_jwt import get_current_user
from sqlmodel import Session, select
from app.core.database import get_db
from app.models.file_model import FileModel
from app.models.user_model import User

async def file_service_controller(session_id: str, request: Request, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        statement = select(FileModel).where(FileModel.id == session_id, FileModel.userId == current_user.id)
        file = db.exec(statement).first()

        if not file:
            raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            details = "File or session not found"
        )

        file_state = {
            "session_id": file.id,
            "clientFile": file.clientFile,
            "client": file.client,
            "sessionTitle": file.sessionTitle,
            "context": file.context,
            "selected_deliverables": file.deliverables,
            "email_type": file.emailType,
            "user_id": current_user.id,

            # LLM Params
            "transcribe": None,
            "scope_document": None,
            "flow_diagram": None,
            "email": None
        }
        config = {
            "configurable": {
                "thread_id": file.id
            }
        }
        final_state = await langgraph_app.ainvoke(file_state, config=config)
        return final_state

        # Await LangGraph API to send file over to
        # More changes
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            details = f"Internal Server Error: {str(e)}"
        )
    
