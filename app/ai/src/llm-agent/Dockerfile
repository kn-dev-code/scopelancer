FROM python:3.13-slim

WORKDIR /llm-agent

RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY pyproject.toml uv.lock ./

RUN uv pip install --system --no-cache-dir .

COPY ./app ./app

EXPOSE 8000

CMD ["uvicorn", "app.routes.main_router:app", "--host", "0.0.0.0", "--port", "8000"]