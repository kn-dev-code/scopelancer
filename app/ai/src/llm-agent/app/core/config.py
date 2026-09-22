from pydantic_settings import BaseSettings

class Settings(BaseSettings):

    # Project Keys
    DATABASE_URL: str
    PROJECT_NAME: str = "Scopelancer"
    SECRET_KEY: str

    # LLM Keys
    ANTHROPIC_API_KEY: str
    GROQ_WHISPER_API_KEY: str

    # Docker/Postgres Keys
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_SERVER: str = "db"
    POSTGRES_PORT: int = 5432
    DB_NAME: str

    # LangGraph Keys
    LANGGRAPH_API_KEY: str
    LANGSMITH_TRACING: bool
    LANGSMITH_ENDPOINT: str

    # Env Specifics
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()