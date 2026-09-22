from sqlmodel import SQLModel, Field, Optional
from enum import Enum



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
    id: str = Field(default=None, primary_key=True)
    clientFile: str
    client: str
    session_title: str
    context: Optional[str]
    deliverables: Deliverables = None,
    email_type: EmailType = None
   