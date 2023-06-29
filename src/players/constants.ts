import { IPlayer, IPlayerToken, IStats } from "./types";
import matej from "../images/players/matej_v2.png";
import { IKeyImage } from "../tokens/constants";

const PLUGIN = "PLAYERS";

export const LOGIN_PLAYER = `${PLUGIN}_login_player`;
export const ADD_COIN = `${PLUGIN}_add_coin`;
export const ADD_TOKEN = `${PLUGIN}_add_token`;

export const PLAYER_IMAGE_LIST : IKeyImage = {
  matej: matej,
};

export const CUSTOM_PLAYER_TOKENS: IPlayerToken[] = [
  { tokenId: "slimak", count: 0, upgrade: 1, straight: false },
  { tokenId: "krtek", count: 0, upgrade: 2, straight: false },
  { tokenId: "mozek", count: 0, upgrade: 3, straight: false },
  { tokenId: "laso", count: 0, upgrade: 0, straight: false },
  { tokenId: "slon", count: 0, upgrade: 1, straight: false },
  { tokenId: "netopyr", count: 0, upgrade: 0, straight: false },
  { tokenId: "kozel", count: 0, upgrade: 2, straight: false },
  { tokenId: "kanon", count: 0, upgrade: 3, straight: false },
  { tokenId: "ctyrlistek", count: 0, upgrade: 3, straight: false },
  { tokenId: "moucha", count: 0, upgrade: 1, straight: false },
];

export const CUSTOM_PLAYER_STATS : IStats = {
    points: 0,
    coins: 0,
    strike: 0,
};

export const CUSTOM_PLAYER: IPlayer = {
  id: "matej",
  name: "Matěj",
  title: "Král netopýrů",
  stats: CUSTOM_PLAYER_STATS,
  tokens: CUSTOM_PLAYER_TOKENS
};


