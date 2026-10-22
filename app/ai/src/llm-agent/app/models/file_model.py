from datetime import date
from sqlmodel import SQLModel, Field, Optional
from enum import Enum
from sqlalchemy import Column, String, Text
from sqlalchemy.orm import declarative_base


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
Base = declarative_base()
class ProcessingDeliverables(Base):
    __tablename__ = "processing_session"
    id = Column(String, primary_key=True),
    user_id = Column(String, nullable=False),
    file_path = Column(String, nullable = False),
    transcription = Column(Text, nullable=True),
    scope_document = Column(Text, nullable=True),
    flow_diagram = Column(Text, nullable=True),
    email = Column(Text, nullable=True)
   