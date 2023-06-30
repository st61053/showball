from pymongo import MongoClient

from app.config import get_settings
from app.db import Tokens
from app.models import Token

TOKENS = [
    Token(
        token_id="slimak",
        name="slimák",
        points={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        coins={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        upgrades={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
    ),
    Token(
        token_id="krtek",
        name="krtek",
        points={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        coins={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        upgrades={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
    ),
    Token(
        token_id="mozek",
        name="mozek",
        points={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        coins={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        upgrades={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
    ),
    Token(
        token_id="laso",
        name="laso",
        points={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        coins={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        upgrades={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
    ),
    Token(
        token_id="slon",
        name="slon",
        points={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        coins={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        upgrades={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
    ),
    Token(
        token_id="netopyr",
        name="netopýr",
        points={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        coins={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        upgrades={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
    ),
    Token(
        token_id="kozel",
        name="kozel",
        points={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        coins={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        upgrades={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
    ),
    Token(
        token_id="kanon",
        name="kanon",
        points={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        coins={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        upgrades={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
    ),
    Token(
        token_id="ctyrlistek",
        name="čtyřlístek",
        points={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        coins={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        upgrades={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
    ),
    Token(
        token_id="moucha",
        name="moucha",
        points={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        coins={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
        upgrades={"0": 0, "1": 0, "2": 0, "3": 0, "4": 0},
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
