from fastapi import APIRouter, HTTPException, status
from fastapi import Request
from app.services.file_services import file_service_controller, email_revision_controller, flow_revision_controller, scope_revision_controller
from fastapi import Depends
from app.core.database import get_db
from app.util.auth_jwt import get_current_user
from app.models.user_model import User

router = APIRouter(
    prefix="/file",
    tags=["Files"]
)
@router.post("/file-conversion")
async def file_service(request: Request, db = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id = current_user.get("id") or current_user.get("user_id") or current_user.get("sub")
    if not user_id: 
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            details = "No user found"
        )
    file_llm_model = await file_service_controller
    return file_llm_model

@router.patch("/file-conversion/email-revision")
async def email_revision(request: Request, db = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id = current_user.get("id") or current_user.get("user_id") or current_user.get("sub")
    if not user_id: 
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            details = "No user found"
        )
    email_revision = await email_revision_controller
    return email_revision

@router.patch("/file-conversion/flow-revision")
async def email_revision(request: Request, db = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id = current_user.get("id") or current_user.get("user_id") or current_user.get("sub")
    if not user_id: 
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            details = "No user found"
        )
    flow_revision = await flow_revision_controller
    return flow_revision

@router.patch("/file-conversion/scope-revision")
async def email_revision(request: Request, db = Depends(get_db), current_user: User = Depends(get_current_user)):
    user_id = current_user.get("id") or current_user.get("user_id") or current_user.get("sub")
    if not user_id: 
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            details = "No user found"
        )
    scope_revision = await scope_revision_controller
    return scope_revision
