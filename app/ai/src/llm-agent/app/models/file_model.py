from typing import Optional
from sqlmodel import SQLModel, Field
from enum import Enum
from sqlalchemy import Text


# Enum for deliverables
class Deliverables(str, Enum):
    TRANSCRIBE = "TRANSCRIBE"
    SCOPEDOCUMENT = "SCOPEDOCUMENT"
    FLOWDIAGRAM = "FLOWDIAGRAM"
    EMAIL = "EMAIL"


# Enum for email type
class EmailType(str, Enum):
    PROFESSIONAL = "PROFESSIONAL"
    FRIENDLY = "FRIENDLY"
    DIRECT = "DIRECT"

# Model class for Files
class FileModel(SQLModel, table=True):
    __tablename__ = "AppSession"
    id: str = Field(default=None, primary_key=True)
    clientFileKey: str
    client: str
    sessionTitle: str
    context: Optional[str] = None
    deliverables: Optional[Deliverables] = Field(default=None)
    emailType: Optional[EmailType] = Field(default=None)
    userId: str = Field(foreign_key="User.id")

# Model class for ProcessingDeliverables
class ProcessingDeliverables(SQLModel, table=True):
    __tablename__ = "processing_session"
    thread_id: str = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="User.id")
    file_path: str
    transcription: Optional[str] = Field(default=None, sa_type=Text)
    scope_document: Optional[str] = Field(default=None, sa_type=Text)
    flow_diagram: Optional[str] = Field(default=None, sa_type=Text)
    email: Optional[str] = Field(default=None, sa_type=Text)
