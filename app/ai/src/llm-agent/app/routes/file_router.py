from fastapi import APIRouter, HTTPException, status
from fastapi import Request
from app.services.file_services import file_service_controller, email_revision_controller, flow_revision_controller, scope_revision_controller
from fastapi import Depends
from sqlmodel import select
from app.core.database import get_db
from app.util.auth_jwt import get_current_user
from app.models.user_model import User
from app.models.file_model import FileModel

file_router = APIRouter(
    prefix="/file",
    tags=["Files"]
)
@router.post("/file-conversion")
async def file_service(session_id: str, request: Request, db = Depends(get_db), current_user: User = Depends(get_current_user)):
    statement = select(FileModel).where(FileModel.userId == current_user.id)
    if not statement: 
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "No user found"
        )
    file_record = db.exec(statement).first()
    file_llm_model = await file_service_controller(
        session_id=session_id,
        request=request,
        db=db,
        current_user=current_user
    )
    return file_llm_model

@router.patch("/sessions/{session_id}/email-revision")
async def handle_email_revision(session_id: str, request: Request, db = Depends(get_db), current_user: User = Depends(get_current_user)):
    statement = select(FileModel).where(FileModel.userId == current_user.id, FileModel.id == session_id)
    if not statement: 
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "No user found"
        )
    email_record = db.exec(statement).first()
    email_revision = await email_revision_controller(
        session_id=session_id,
        request=request,
        db=db,
        current_user=current_user
    )
    return email_revision

@router.patch("/sessions/{session_id}/flow-revision")
async def handle_flow_revision(session_id: str, request: Request, db = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id = current_user.get("id") or current_user.get("user_id") or current_user.get("sub")
    if not user_id: 
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "No user found"
        )
    flow_revision = await flow_revision_controller(
        session_id=session_id,
        request=request,
        db=db,
        current_user=current_user
    )
    return flow_revision

@router.patch("/sessions/{session_id}/scope-revision")
async def handle_scope_revision(session_id: str, request: Request, db = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id = current_user.get("id") or current_user.get("user_id") or current_user.get("sub")
    if not user_id: 
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = "No user found"
        )
    scope_revision = await scope_revision_controller(
        session_id=session_id,
        request=request,
        db=db,
        current_user=current_user
    )
    return scope_revision
