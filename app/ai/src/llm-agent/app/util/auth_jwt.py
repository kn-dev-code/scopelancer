from email.policy import HTTP
from fastapi import Request, Depends, HTTPException, status
from app.core.database import get_db
from sqlmodel import Session, select
from app.models.user_model import User, Session as AuthSession
from datetime import timezone, datetime

def get_current_user(request: Request, user_id: str, db: Session = Depends(get_db)) -> User:
     auth_header = request.headers("Authorization")
     if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Missing or invalid authentication token"
        )
    
     token = auth_header.split(" ")[1]
     session_record = db.exec(select(AuthSession).where(AuthSession.token == token))

     if not session_record or session_record.expiresAt < datetime.now(timezone.utc):
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            details="Session expired or invalid"
        )

     user = db.exec(select(User).where(User.id == user_id)).first()
     if not user:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            details = "User not found"
        )
     return user