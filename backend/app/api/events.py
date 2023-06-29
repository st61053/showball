from typing import Callable

from fastapi import FastAPI
from pymongo import MongoClient

from app.config import get_settings


def create_start_app_handler(
    app: FastAPI,
) -> Callable:
    """Create start app handler

    :param app: Application
    :type app: FastAPI
    :return: Start handler
    :rtype: Callable
    """

    settings = get_settings()

    async def start_app() -> None:
        app.mongo_client = MongoClient(settings.MONGO_DATABASE_URI)  # type: ignore

    return start_app


def create_stop_app_handler(app: FastAPI) -> Callable:
    """Create stop app handler

    :param app: Application
    :type app: FastAPI
    :return: Stop handler
    :rtype: Callable
    """

    async def stop_app() -> None:
        app.mongo_client.close()  # type: ignore

    return stop_app
