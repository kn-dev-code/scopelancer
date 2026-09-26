from tkinter import N
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class User(SQLModel, table=True):
    __tablename__ = "User"
    id: str = Field(primary_key=True)
    email: str = Field(unique=True, index=True)
    name: Optional[str] = None
    image: Optional[str] = None
    emailVerified: bool = Field(default=False)
    role: str = Field(default="USER")
    credits: int = Field(default=20)
    createdAt: datetime
    updatedAt: datetime


class Session(SQLModel, table=True):
    __tablename__ = "session"
    id: str = Field(primary_key=True)
    userId: str = Field(foreign_key="User.id")
    token: str = Field(unique=True, index=True)
    expiresAt: datetime
    createdAt: datetime
    updatedAt: datetime
