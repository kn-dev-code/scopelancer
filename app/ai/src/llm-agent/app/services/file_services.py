from fastapi import FastAPI, HTTPException, Request, Depends, status
from app.util.auth_jwt import get_current_user
from sqlmodel import Session, select
from app.core.database import get_db
from app.models.file_model import FileModel
from app.models.user_model import User

def file_service_controller(request: Request, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        statement = select(FileModel).where(FileModel.userId == current_user.id).first()
        file = db.exec(statement).first()

        if not file:
            raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            details = "File or session not found"
        )

        # Await LangGraph API to send file over to

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR,
            details = f"Internal Server Error: {str(e)}"
        )
    
