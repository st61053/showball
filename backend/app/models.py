from datetime import datetime
from typing import TypedDict


class PlayerStats(TypedDict):
    points: int
    coins: int
    strike: int
    last_strike: datetime | None


class PlayerTokenStats(TypedDict):
    count: int
    upgrade: int
    straight: bool


class Player(TypedDict):
    player_id: str
    name: str
    password: str
    stats: PlayerStats
    tokens: dict[str, PlayerTokenStats]
    last_spin: datetime | None


class Token(TypedDict):
    token_id: str
    name: str
    points: dict[int, int]
    coins: dict[int, int]
    upgrades: dict[int, int]


class Strike(TypedDict):
    player_id: int
    token_id: int
    points: int
    coins: int
    timestamp: datetime
