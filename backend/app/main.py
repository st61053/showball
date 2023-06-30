from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.events import create_start_app_handler, create_stop_app_handler
from app.api.v1 import endpoints as api_v1
from app.config import get_settings


def create_app() -> FastAPI:
    """Create app

    :return: Application
    :rtype: FastAPI
    """

    settings = get_settings()

    current_app = FastAPI(
        title="ShowBall Backend API",
        openapi_url="/api/v1/openapi.json",
        docs_url="/api/v1/docs",
        redoc_url="/api/v1/redoc",
    )

    current_app.add_event_handler(
        "startup",
        create_start_app_handler(current_app),
    )
    current_app.add_event_handler(
        "shutdown",
        create_stop_app_handler(current_app),
    )

    current_app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://10.0.0.23:3000", "http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    current_app.include_router(api_v1.router, prefix="/api/v1")

    return current_app


app = create_app()
