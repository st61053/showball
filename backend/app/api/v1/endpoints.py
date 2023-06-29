from fastapi import APIRouter, Depends, Path, status
from fastapi.security import OAuth2PasswordRequestForm

from app.config import Settings, get_settings
from app.db import Players, Tokens
from app.models import Player, PlayerStats, PlayerTokenStats
from app.schemas import (AccessToken, PlayerCreateSchema, PlayerOutputSchema,
                         TokenOutputSchema, TokensOutputSchema)
from app.services import (create_access_token_for_user, get_password_hash,
                          verify_password)

from ..dependencies import get_collection, get_current_player
from ..errors import (HTTPBadRequestError, HTTPNotFoundError,
                      HTTPUnauthorizedError)

router = APIRouter()


@router.post("/auth/token", response_model=AccessToken)
async def token(
    *,
    form_data: OAuth2PasswordRequestForm = Depends(),
    settings: Settings = Depends(get_settings),
    users: Players = Depends(get_collection(Players)),
) -> AccessToken:
    """Create an access token for api authentication."""

    if (user := users.get(form_data.username)) is None or not verify_password(
        form_data.password, user["password"]
    ):
        raise HTTPUnauthorizedError(
            detail="Incorrect username or password.",
        )

    access_token = create_access_token_for_user(user, settings.SECRET_KEY)

    return AccessToken(access_token=access_token, token_type="bearer")


@router.get("/player", response_model=PlayerOutputSchema)
async def get_player(
    user: Player = Depends(get_current_player),
) -> PlayerOutputSchema:
    return PlayerOutputSchema.from_model(user)


@router.post(
    "/player",
    response_model=PlayerOutputSchema,
    status_code=status.HTTP_201_CREATED,
)
async def create_player(
    create_data: PlayerCreateSchema,
    players: Players = Depends(get_collection(Players)),
    tokens: Tokens = Depends(get_collection(Tokens)),
) -> PlayerOutputSchema:
    if not (players.get(create_data.player_id) is None):
        raise HTTPBadRequestError(
            name="Player identifier",
            value=create_data.player_id,
            detail=f"Player with given identifier {create_data.player_id} already exist.",
        )

    password_hash = get_password_hash(create_data.password)

    player = Player(
        player_id=create_data.player_id,
        name=create_data.name,
        password=password_hash,
        stats=PlayerStats(points=0, coins=0, strike=0),
        tokens={
            t["token_id"]: PlayerTokenStats(count=0, upgrade=0, straight=False)
            for t in tokens.get_list()
        },
    )

    players.create(player)

    return PlayerOutputSchema.from_model(player)


@router.get("/tokens", response_model=TokensOutputSchema)
async def get_tokens(
    tokens: Tokens = Depends(get_collection(Tokens)),
) -> PlayerOutputSchema:
    return TokensOutputSchema(
        tokens=[TokenOutputSchema.from_model(m) for m in tokens.get_list()]
    )


@router.get("/token/{token_id}", response_model=TokenOutputSchema)
async def get_token_by_id(
    token_id: str = Path(..., title="Token identifier"),
    tokens: Tokens = Depends(get_collection(Tokens)),
) -> PlayerOutputSchema:
    if (token := tokens.get(token_id)) is None:
        raise HTTPNotFoundError(f"Token with identifier '{token_id}' not found.")

    return TokenOutputSchema.from_model(token)
