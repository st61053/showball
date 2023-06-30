from typing import Callable

from fastapi import Depends, Request
from fastapi.security import OAuth2PasswordBearer
from pymongo.database import Database

from app.config import Settings, get_settings
from app.db import Collection, Players
from app.models import Player
from app.services import credentials_exception, get_player_id_from_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


def get_db(
    *,
    request: Request,
) -> Database:
    """Get database"""

    return request.app.mongo_client["showball"]


def get_collection(
    collection_type: type[Collection],
) -> Callable[[Database], Collection]:
    def _get_collection(
        db: Database = Depends(get_db),
    ) -> Collection:
        return collection_type(db)

    return _get_collection


def _auth(players: Players, token: str, secret: str) -> Player:
    player_id = get_player_id_from_token(token, secret)

    if (player := players.get(player_id)) is None:
        raise credentials_exception

    return player


async def get_current_player(
    *,
    token: str = Depends(oauth2_scheme),
    settings: Settings = Depends(get_settings),
    players: Players = Depends(get_collection(Players)),
) -> Player:
    """Get current player according to jwt token"""

    return _auth(players, token, settings.SECRET_KEY)
