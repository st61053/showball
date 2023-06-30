from datetime import datetime, timedelta

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.api.errors import HTTPUnauthorizedError
from app.models import Player

ACCESS_TOKEN_EXPIRE_MINUTES = 21 * 24 * 60  # 3 week
ACCESS_TOKEN_HASH_ALGORITHM = "HS256"

credentials_exception = HTTPUnauthorizedError(
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


def create_jwt_token(sub: str, secret: str, expire_delta: timedelta) -> str:
    """Create jwt token

    :param sub: Token sub
    :type sub: str
    :param secret: Secret
    :type secret: str
    :param expire_delta: Token expire delta
    :type expire_delta: timedelta
    :return: Jwt Token
    :rtype: str
    """

    payload = {
        "type": "access_token",
        "exp": datetime.utcnow() + expire_delta,
        "iat": datetime.utcnow(),
        "sub": sub,
    }

    return jwt.encode(payload, secret, algorithm=ACCESS_TOKEN_HASH_ALGORITHM)


def create_access_token_for_user(player: Player, secret: str) -> str:
    """Create access token for given player

    :param player: Player
    :type player: Player
    :param secret: Secret
    :type secret: str
    :return: Access token of user
    :rtype: str
    """

    return create_jwt_token(
        sub=player["player_id"],
        secret=secret,
        expire_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )


def get_player_id_from_token(token: str, secret: str) -> str:
    """Get player identifier from given token

    :param token: Access token of project
    :type token: str
    :param secret: Secret
    :type secret: str
    :raises credentials_exception: Raised if invalid access token
    :return: Text identifier of player
    :rtype: str
    """

    try:
        payload = jwt.decode(
            token=token, key=secret, algorithms=[ACCESS_TOKEN_HASH_ALGORITHM]
        )

    except JWTError:
        raise credentials_exception

    if (text_id := payload.get("sub", None)) is None:
        raise credentials_exception

    return text_id


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    """Get password hash

    :param password: Password whose hash will be created
    :type password: str
    :return: Password hash
    :rtype: str
    """

    return pwd_context.hash(password)


def verify_password(plain_password: str, password_hash: str) -> bool:
    """Verify password by its hash
    :param plain_password: Password to be verified
    :type plain_password: str
    :param password_hash: Verifying password hash
    :type password_hash: str
    :return: True if password is valid according to its hash
    :rtype: bool
    """

    return pwd_context.verify(plain_password, password_hash)
