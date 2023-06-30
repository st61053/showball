from pymongo import MongoClient

from app.config import get_settings
from app.db import Tokens
from app.models import Token

TOKENS = [
    Token(
        token_id="slimak",
        name="slimák",
        points={"0": 1, "1": 2, "2": 3, "3": 4, "4": 5},
        coins={"0": 1, "1": 2, "2": 3, "3": 4, "4": 5},
        upgrades={"0": 10, "1": 15, "2": 25, "3": 40, "4": 60},
    ),
    Token(
        token_id="krtek",
        name="krtek",
        points={"0": 1, "1": 2, "2": 3, "3": 4, "4": 5},
        coins={"0": 1, "1": 2, "2": 3, "3": 4, "4": 5},
        upgrades={"0": 10, "1": 15, "2": 25, "3": 40, "4": 60},
    ),
    Token(
        token_id="mozek",
        name="mozek",
        points={"0": 2, "1": 3, "2": 4, "3": 5, "4": 6},
        coins={"0": 2, "1": 3, "2": 4, "3": 5, "4": 6},
        upgrades={"0": 10, "1": 15, "2": 25, "3": 40, "4": 60},
    ),
    Token(
        token_id="laso",
        name="laso",
        points={"0": 3, "1": 4, "2": 5, "3": 6, "4": 7},
        coins={"0": 3, "1": 4, "2": 5, "3": 6, "4": 7},
        upgrades={"0": 10, "1": 15, "2": 25, "3": 40, "4": 60},
    ),
    Token(
        token_id="slon",
        name="slon",
        points={"0": 4, "1": 5, "2": 6, "3": 7, "4": 8},
        coins={"0": 4, "1": 5, "2": 6, "3": 7, "4": 8},
        upgrades={"0": 10, "1": 15, "2": 25, "3": 40, "4": 60},
    ),
    Token(
        token_id="netopyr",
        name="netopýr",
        points={"0": 4, "1": 5, "2": 6, "3": 7, "4": 8},
        coins={"0": 4, "1": 5, "2": 6, "3": 7, "4": 8},
        upgrades={"0": 10, "1": 15, "2": 25, "3": 40, "4": 60},
    ),
    Token(
        token_id="kozel",
        name="kozel",
        points={"0": 3, "1": 4, "2": 5, "3": 6, "4": 7},
        coins={"0": 3, "1": 4, "2": 5, "3": 6, "4": 7},
        upgrades={"0": 10, "1": 15, "2": 25, "3": 40, "4": 60},
    ),
    Token(
        token_id="kanon",
        name="kanon",
        points={"0": 6, "1": 7, "2": 8, "3": 9, "4": 10},
        coins={"0": 6, "1": 7, "2": 8, "3": 9, "4": 10},
        upgrades={"0": 10, "1": 15, "2": 25, "3": 40, "4": 60},
    ),
    Token(
        token_id="ctyrlistek",
        name="čtyřlístek",
        points={"0": 6, "1": 7, "2": 8, "3": 9, "4": 10},
        coins={"0": 6, "1": 7, "2": 8, "3": 9, "4": 10},
        upgrades={"0": 10, "1": 15, "2": 25, "3": 40, "4": 60},
    ),
    Token(
        token_id="moucha",
        name="moucha",
        points={"0": 3, "1": 4, "2": 5, "3": 6, "4": 7},
        coins={"0": 3, "1": 4, "2": 5, "3": 6, "4": 7},
        upgrades={"0": 10, "1": 15, "2": 25, "3": 40, "4": 60},
    ),
]


def main() -> None:
    print("Initializing database ...")

    settings = get_settings()

    with MongoClient(settings.MONGO_DATABASE_URI) as client:
        tokens = Tokens(client["showball"])

        for t in TOKENS:
            tokens.update(t)


if __name__ == "__main__":
    main()
