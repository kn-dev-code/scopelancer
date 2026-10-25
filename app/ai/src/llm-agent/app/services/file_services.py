from fastapi import FastAPI, HTTPException, Request, Depends, status
from app.util.auth_jwt import get_current_user
from sqlmodel import Session, select
from app.core.database import get_db
from app.models.file_model import FileModel, ProcessingDeliverables
from app.models.user_model import User
from app.api.langgraph import langgraph_app
from langgraph.types import Command

async def file_service_controller(session_id: str, request: Request, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)) -> ProcessingDeliverables:
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
        deliverable_record = ProcessingDeliverables(
            thread_id = file.id,
            user_id = current_user.id,
            file_path = file.clientFile,
            transcription = final_state.get("transcribe"),
            scope_document = final_state.get("scope_document"),
            flow_diagram = final_state.get("flow_diagram"),
            email = final_state.get("email")
        )

        db.add(deliverable_record)
        await db.commit()
        await db.refresh(deliverable_record)
        return deliverable_record
        # Work on pushing the final_state to the selected processing session
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            details = f"Internal Server Error: {str(e)}"
        )
# email revision for user
async def email_revision(session_id: str, request: Request, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        statement = select(ProcessingDeliverables).where(ProcessingDeliverables.thread_id == session_id, ProcessingDeliverables.user_id == current_user.id)
        db_item = db.exec(statement).first()

        if not db_item:
            raise HTTPException(
                status_code= status.HTTP_400_BAD_REQUEST,
                details= f"Edited email content required."
            )

        config = {
            "configurable": {
                "thread_id": session_id
            }
        }
        
        body = await request.json()
        user_edited_email = body.get("edited_email")

        final_state = await langgraph_app.ainvoke(
            Command(resume=user_edited_email, config=config)
        )

        updated_email = final_state.get("email", user_edited_email)

        db_item.email = updated_email
        db_item.add(db_item)
        db_item.commit()
        db_item.refresh(db_item)

        return {"status": "SUCCESS", "data": db_item}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            details = f"Internal Server Error: {str(e)}"
        )

# scope revision for user
async def scope_revision(session_id: str, request: Request, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        statement = select(ProcessingDeliverables).where(ProcessingDeliverables.thread_id == session_id, ProcessingDeliverables.user_id == get_current_user.id)
        user_scope = db.exec(statement).first()
        if user_scope.scope_document is None:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                details = f"Scope document not found"
            )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            details = f"Internal Server Error: {str(e)}"
        )

# flow revision for user
async def flow_revision(session_id: str, request: Request, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
     try:
        statement = select(ProcessingDeliverables).where(ProcessingDeliverables.thread_id == session_id, ProcessingDeliverables.user_id == get_current_user.id)
        user_scope = db.exec(statement).first()
        if user_scope.flow_diagram is None:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                details = f"Scope document not found"
            )
     except HTTPException:
        raise
     except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            details = f"Internal Server Error: {str(e)}"
        )