from datetime import date
from sqlmodel import SQLModel, Field, Optional
from enum import Enum
from sqlalchemy import Column, String, Text


# Enum for deliverables
class Deliverables(str, Enum):
    TRANSCRIBE = "TRANSCRIBE",
    SCOPEDOCUMENT = "SCOPEDOCUMENT",
    FLOWDIAGRAM = "FLOWDIAGRAM",
    EMAIL = "EMAIL"


# Enum for email type
class EmailType(str, Enum):
    PROFESSIONAL = "PROFESSIONAL",
    FRIENDLY = "FRIENDLY",
    DIRECT = "DIRECT"

# Model class for Files
class FileModel(SQLModel, table=True):
    __tablename__ = "AppSession"
    id: str = Field(default=None, primary_key=True)
    clientFile: str
    client: str
    sessionTitle: str
    context: Optional[str]
    deliverables: Optional[Deliverables] = Field(default=None),
    emailType: Optional[EmailType] = Field(default=None),
    userId: str = Field(foreign_key = "User.id")

# Model class for ProcessingDeliverables

class ProcessingDeliverables(SQLModel, table = True):
    __tablename__ = "processing_session"
    thread_id = Field(default=None, primary_key=True),
    user_id: str = Field(foreign_key="User.id"),
    file_path: str = Field(nullable=False)
    transcription: Optional[str] = Field(default=None, sa_column_kwargs={"type_": "TEXT"})
    scope_document: Optional[str] = Field(default=None, sa_column_kwargs={"type_": "TEXT"})
    flow_diagram: Optional[str] = Field(default=None, sa_column_kwargs={"type_": "TEXT"})
    email: Optional[str] = Field(default=None, sa_column_kwargs={"type_": "TEXT"})
   