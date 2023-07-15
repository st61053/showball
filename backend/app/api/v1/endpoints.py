from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Path, status
from fastapi.security import OAuth2PasswordRequestForm

from app.config import Settings, get_settings
from app.db import Players, Strikes, Tokens
from app.models import Player, PlayerStats, PlayerTokenStats, Strike, Token
from app.schemas import (AccessToken, CanSpinSchema, LeaderBoardOutputSchema,
                         LeaderBoardRowOutputSchema, PlayerCreateSchema,
                         PlayerOutputSchema, PlayersOutputSchema,
                         TokenOutputSchema, TokenShowSchema,
                         TokensOutputSchema, TokenUpgradeSchema,
                         WheelSpinSchema)
from app.services import (create_access_token_for_user, get_password_hash,
                          verify_password)

from ..dependencies import get_collection, get_current_player
from ..errors import (HTTPBadRequestError, HTTPNotFoundError,
                      HTTPUnauthorizedError)

STRAIGHT_COINS = 20
STRAIGHT_POINTS = 20

STRIKE_COINS = 1
STRIKE_POINTS = 1
STRIKE_DIV = 3
SPIN_COST = 5

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


@router.get("/players", response_model=PlayersOutputSchema)
async def get_players(
    players: Players = Depends(get_collection(Players)),
) -> PlayerOutputSchema:
    return PlayersOutputSchema(
        players=[PlayerOutputSchema.from_model(p) for p in players.get_list()]
    )


@router.get("/player", response_model=PlayerOutputSchema)
async def get_player_by_username(
    player: Player = Depends(get_current_player),
) -> PlayerOutputSchema:
    return PlayerOutputSchema.from_model(player)


@router.post(
    "/players",
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
        title=create_data.title,
        password=password_hash,
        stats=PlayerStats(points=0, coins=0, strike=0, last_strike=None),
        tokens={
            t["token_id"]: PlayerTokenStats(count=0, upgrade=0, straight=False)
            for t in tokens.get_list()
        },
        last_spin=None,
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


@router.get("/tokens/{token_id}", response_model=TokenOutputSchema)
async def get_token_by_id(
    token_id: str = Path(..., title="Token identifier"),
    tokens: Tokens = Depends(get_collection(Tokens)),
) -> PlayerOutputSchema:
    if (token := tokens.get(token_id)) is None:
        raise HTTPNotFoundError(f"Token with identifier '{token_id}' not found.")

    return TokenOutputSchema.from_model(token)


def fix_player_tokens(player: Player, tokens: list[Token]) -> Player:
    for t in tokens:
        if t["token_id"] not in player["tokens"]:
            player["tokens"][t["token_id"]] = PlayerTokenStats(
                count=0, upgrade=0, straight=False
            )

    return player


def process_straight(player: Player, tokens: list[Token]) -> Player:
    has_straight = True

    for t in tokens:
        if not player["tokens"][t["token_id"]]["straight"]:
            has_straight = False
            break

    if has_straight:
        player["stats"]["coins"] += STRAIGHT_COINS
        player["stats"]["points"] += STRAIGHT_POINTS

        for t in tokens:
            player["tokens"][t["token_id"]]["straight"] = False

    return player


def process_strike_count(player: Player, set_strike: bool) -> Player:
    player_stats = player["stats"]

    now = datetime.now()
    last = player_stats["last_strike"]

    if last is not None and last < now:
        if (now.date() - last.date()) > timedelta(days=2):
            player_stats["strike"] = 1

            if set_strike:
                player_stats["last_strike"] = now

        elif (now.date() - last.date()) >= timedelta(days=1) and set_strike:
            player_stats["strike"] += 1
            player_stats["last_strike"] = now
    else:
        player_stats["strike"] = 1

        if set_strike:
            player_stats["last_strike"] = now

    player["stats"] = player_stats

    return player


@router.post(
    "/show-token",
    response_model=PlayerOutputSchema,
)
async def show_token(
    create_data: TokenShowSchema,
    player: Player = Depends(get_current_player),
    players: Players = Depends(get_collection(Players)),
    tokens: Tokens = Depends(get_collection(Tokens)),
    strikes: Strikes = Depends(get_collection(Strikes)),
) -> PlayerOutputSchema:
    if (token := tokens.get(create_data.token_id)) is None:
        raise HTTPNotFoundError(
            f"Token with identifier {create_data.token_id} not found."
        )

    player = fix_player_tokens(player, tokens.get_list())

    player = process_strike_count(player, set_strike=True)

    player_token = player["tokens"][token["token_id"]]
    player_stats = player["stats"]

    upgrade = str(min(max(player_token["upgrade"], 0), 3))  # cap to [0,3]

    add_points = (
        int(token["points"][upgrade]) + int(player_stats["strike"] / STRIKE_DIV) * STRIKE_POINTS
    )
    add_coins = (
        int(token["coins"][upgrade]) + int(player_stats["strike"] / STRIKE_DIV) * STRIKE_COINS
    )

    player_stats["points"] += add_points
    player_stats["coins"] += add_coins

    strikes.create(
        Strike(
            player_id=player["player_id"],
            token_id=token["token_id"],
            points=add_points,
            coins=add_coins,
            timestamp=datetime.now(),
        )
    )

    if not player_token["straight"]:
        player_token["straight"] = True

    player = process_straight(player, tokens.get_list())

    player_token["count"] += 1

    player["tokens"][token["token_id"]] = player_token
    player["stats"] = player_stats

    players.update(player)

    return PlayerOutputSchema.from_model(player)


@router.post(
    "/upgrade-token",
    response_model=PlayerOutputSchema,
)
async def upgrade_token(
    create_data: TokenUpgradeSchema,
    player: Player = Depends(get_current_player),
    players: Players = Depends(get_collection(Players)),
    tokens: Tokens = Depends(get_collection(Tokens)),
) -> PlayerOutputSchema:
    if (token := tokens.get(create_data.token_id)) is None:
        raise HTTPNotFoundError(
            f"Token with identifier {create_data.token_id} not found."
        )

    player = fix_player_tokens(player, tokens.get_list())

    player_token = player["tokens"][token["token_id"]]

    if player_token["upgrade"] >= 3:
        return PlayerOutputSchema.from_model(player)

    upgrade = min(max(player_token["upgrade"], 0), 2)  # cap to [0,2]

    upgrade_key = str(upgrade)

    player_stats = player["stats"]

    if (
        not create_data.free
        and player_stats["coins"] < token["upgrades"][upgrade_key]
    ):
        raise HTTPBadRequestError(
            f"Not enought coins for level {upgrade + 1} {token['name']} upgrade. Upgrade cost {token['upgrades'][upgrade_key]} but only {player_stats['coins']} is available."
        )

    player_token["upgrade"] = upgrade + 1

    if not create_data.free:
        player_stats["coins"] -= token["upgrades"][upgrade_key]

    player["tokens"][token["token_id"]] = player_token
    player["stats"] = player_stats

    players.update(player)

    return PlayerOutputSchema.from_model(player)


def is_free_spin_available(player: Player) -> bool:
    if "last_spin" not in player or player["last_spin"] is None:
        return True

    now = datetime.now()
    last = player["last_spin"]

    return (now.date() - last.date()) >= timedelta(days=1)


@router.get(
    "/can-spin",
    response_model=CanSpinSchema,
)
async def can_spin(
    player: Player = Depends(get_current_player),
) -> CanSpinSchema:
    return CanSpinSchema(free_spin=is_free_spin_available(player))


@router.post(
    "/wheel-spin",
    response_model=PlayerOutputSchema,
)
async def wheel_spin(
    create_data: WheelSpinSchema,
    player: Player = Depends(get_current_player),
    players: Players = Depends(get_collection(Players)),
) -> PlayerOutputSchema:
    if create_data.free:
        if not is_free_spin_available(player):
            raise HTTPBadRequestError(f"Player does not have free spin available.")

        player["last_spin"] = datetime.now()
    else:
        if not player["stats"]["coins"] >= SPIN_COST:
            raise HTTPBadRequestError(
                f"Not enought coins for spin. {SPIN_COST} coins are required, only {player['stats']['coins']} coins are available."
            )

        player["stats"]["coins"] -= SPIN_COST

    player["stats"]["coins"] += create_data.prize

    players.update(player)

    return PlayerOutputSchema.from_model(player)


@router.get(
    "/leaderboard",
    response_model=LeaderBoardOutputSchema,
)
async def get_leaderboard(
    players: Players = Depends(get_collection(Players)),
) -> PlayerOutputSchema:
    recs = {p["player_id"]: p["stats"]["points"] for p in players.get_list()}
    recs = dict(sorted(recs.items(), key=lambda x: -x[1]))

    return LeaderBoardOutputSchema(
        rows=[
            LeaderBoardRowOutputSchema(player_id=player_id, points=points)
            for player_id, points in recs.items()
        ]
    )
