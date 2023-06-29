from typing import TypeVar

from pymongo.database import Database

from app.models import Player, Token


class Collection:
    def __init__(self, db: Database) -> None:
        self.db = db


CollectionT = TypeVar("CollectionT", bound=Collection)


class Players(Collection):
    def __init__(self, db: Database) -> None:
        super().__init__(db)
        self.collection = self.db["players"]

    def get(self, player_id: str) -> Player | None:
        return self.collection.find_one({"player_id": player_id}, {"_id": 0})

    def update(self, player: Player) -> None:
        self.collection.update_one(
            {"player_id": player["player_id"]}, {"$set": player}, upsert=True
        )

    def create(self, player: Player) -> None:
        self.update(player)


class Tokens(Collection):
    def __init__(self, db: Database) -> None:
        super().__init__(db)
        self.collection = self.db["tokens"]

    def get_list(self) -> list[Token]:
        return list(self.collection.find(projection={"_id": 0}))

    def get(self, token_id: str) -> Token | None:
        return self.collection.find_one({"token_id": token_id}, {"_id": 0})

    def update(self, token: Token) -> None:
        self.collection.update_one(
            {"token_id": token["token_id"]}, {"$set": token}, upsert=True
        )

    def create(self, token: Token) -> None:
        self.update(token)
