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
    __tablename__ = "AppSession"
    id: str = Field(default=None, primary_key=True)
    clientFile: str
    client: str
    sessionTitle: str
    context: Optional[str]
    deliverables: Optional[Deliverables] = Field(default=None),
    emailType: Optional[EmailType] = Field(default=None),
    userId: str = Field(foreign_key = "User.id")
   