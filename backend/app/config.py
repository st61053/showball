from functools import lru_cache
from typing import Any

from pydantic import BaseSettings, Field, MongoDsn, validator


class Settings(BaseSettings):
    SECRET_KEY: str

    # Mongo
    MONGO_HOST: str = Field("localhost", title="Mongo database host")
    MONGO_USERNAME: str | None = Field(None, title="Mongo database username")
    MONGO_PASSWORD: str | None = Field(None, title="Mongo database password")

    MONGO_DATABASE_URI: MongoDsn | None = None

    @validator("MONGO_DATABASE_URI", pre=True)
    def assemble_mongo_connection_uri(
        cls, v: str | None, values: dict[str, Any]
    ) -> Any:
        if isinstance(v, str):
            return v

        return MongoDsn.build(
            scheme="mongodb",
            user=values.get("MONGO_USERNAME"),
            password=values.get("MONGO_PASSWORD"),
            host=values.get("MONGO_HOST"),
        )


@lru_cache
def get_settings() -> Settings:
    """Get system setting

    :return: Settings of system
    :rtype: Settings
    """

    return Settings(_env_file=".env", _env_file_encoding="utf-8")  # type: ignore
