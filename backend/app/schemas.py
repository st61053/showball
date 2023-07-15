import re
from typing import Any

from pydantic import BaseModel, Field, validator

from app.models import Player, PlayerStats, PlayerTokenStats, Token


class AccessToken(BaseModel):
    """Class to represent access token"""

    access_token: str = Field(..., title="Access token", description="Access token.")
    token_type: str = Field(..., title="Token type", description="Type of token.")

    class Config:
        schema_extra = {
            "example": {
                "access_token": "asd34ljnas4dlkj3dls",
                "token_type": "bearer",
            }
        }


class PlayerStatsOutputSchema(BaseModel):
    points: int
    coins: int
    strike: int

    @classmethod
    def from_model(cls, model: PlayerStats) -> "PlayerStatsOutputSchema":
        return cls(points=model["points"], coins=model["coins"], strike=model["strike"])


class PlayerTokenOutputSchema(BaseModel):
    tokenId: str
    count: int
    upgrade: int
    straight: bool

    @classmethod
    def from_model(
        cls, token_id: str, model: PlayerTokenStats
    ) -> "PlayerStatsOutputSchema":
        return cls(
            tokenId=token_id,
            count=model["count"],
            upgrade=model["upgrade"],
            straight=model["straight"],
        )


class PlayerOutputSchema(BaseModel):
    id: str
    name: str
    stats: PlayerStatsOutputSchema
    tokens: list[PlayerTokenOutputSchema]

    @classmethod
    def from_model(cls, model: Player) -> "PlayerOutputSchema":
        return cls(
            id=model["player_id"],
            name=model["name"],
            stats=PlayerStatsOutputSchema.from_model(model["stats"]),
            tokens=[
                PlayerTokenOutputSchema.from_model(i, t)
                for i, t in model["tokens"].items()
            ],
        )


class PlayersOutputSchema(BaseModel):
    players: list[PlayerOutputSchema]


class PlayerCreateSchema(BaseModel):
    name: str
    player_id: str
    password: str

    @validator("player_id")
    def validate_player_id(cls, v: str, **values: Any) -> str:
        if not bool(re.match("^[A-Za-z0-9_]*$", v)):
            raise ValueError("Player identifier must match pattern ^[A-Za-z0-9_]*$")

        return v

    class Config:
        schema_extra = {
            "example": {
                "name": "Name",
                "player_id": "user_id",
                "password": "password",
            }
        }


class TokenOutputSchema(BaseModel):
    id: str
    name: str
    points: dict[int, int]
    coins: dict[int, int]
    upgrades: dict[int, int]

    @classmethod
    def from_model(cls, model: Token) -> "TokenOutputSchema":
        return cls(
            id=model["token_id"],
            name=model["name"],
            points=model["points"],
            coins=model["coins"],
            upgrades=model["upgrades"],
        )


class TokensOutputSchema(BaseModel):
    tokens: list[TokenOutputSchema]


class TokenShowSchema(BaseModel):
    token_id: str


class TokenUpgradeSchema(BaseModel):
    token_id: str
    free: bool = Field(False)


class WheelSpinSchema(BaseModel):
    prize: int = Field(ge=0)
    free: bool


class LeaderBoardRowOutputSchema(BaseModel):
    player_id: str
    points: int


class LeaderBoardOutputSchema(BaseModel):
    rows: list[LeaderBoardRowOutputSchema]


class CanSpinSchema(BaseModel):
    free_spin: bool
