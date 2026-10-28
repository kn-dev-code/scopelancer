from fastapi import FastAPI
from fastapi import APIRouter
from app.routes.file_router import file_router


main_router = APIRouter()


# Routers for later
main_router.include_router(
   file_router,
   prefix = "/v1/file-routes",
   tags = ["Files"]
)