import { IPlayer, IPlayerToken, IStats } from "./types";

import veverka_profile from "../images/players/veverka_profile.png";
import matej_profile from "../images/players/matej_profile.png";
import ondra_profile from "../images/players/ondra_profile.png";
import mara_profile from "../images/players/mara_profile.png";
import ales_profile from "../images/players/ales_profile.png";
import luky_profile from "../images/players/luky_profile.png";
import gulas_profile from "../images/players/gulas_profile.png";
import zeli_profile from "../images/players/zeli_profile.png";
import jirka_profile from "../images/players/jirka_profile.png";
import kuba_profile from "../images/players/kuba_profile.png";
import simon_profile from "../images/players/simon_profile.png";
import matous_profile from "../images/players/matous_profile.png";
import placeholder_profile from "../images/players/placeholder_profile.png";

import { IKeyImage } from "../tokens/constants";

const PLUGIN = "PLAYERS";

export const LOGIN_PLAYER = `${PLUGIN}_login_player`;
export const LOGOUT_PLAYER = `${PLUGIN}_logout_player`;
export const ADD_COIN = `${PLUGIN}_add_coin`;
export const ADD_TOKEN = `${PLUGIN}_add_token`;
export const CAN_SPIN = `${PLUGIN}_can_spin`;
export const GET_PLAYERS = `${PLUGIN}_get_players`;

export const PLAYER_IMAGE_LIST : IKeyImage = {
  admin: matej_profile,

  matej: matej_profile,
  ondra: ondra_profile,
  ales: ales_profile,
  luky: luky_profile,
  gulas: gulas_profile,
  zeli: zeli_profile,
  mara: mara_profile,
  veverka: veverka_profile,
  kuba: kuba_profile,
  jirka: jirka_profile,
  simon: simon_profile,
  matous: matous_profile,
  jezek: placeholder_profile,
  placeholder: placeholder_profile
};

// export const CUSTOM_PLAYER_TOKENS: IPlayerToken[] = [
//   { tokenId: "slimak", count: 0, upgrade: 1, straight: false },
//   { tokenId: "krtek", count: 0, upgrade: 2, straight: false },
//   { tokenId: "mozek", count: 0, upgrade: 3, straight: false },
//   { tokenId: "laso", count: 0, upgrade: 0, straight: false },
//   { tokenId: "slon", count: 0, upgrade: 1, straight: false },
//   { tokenId: "netopyr", count: 0, upgrade: 0, straight: false },
//   { tokenId: "kozel", count: 0, upgrade: 2, straight: false },
//   { tokenId: "kanon", count: 0, upgrade: 3, straight: false },
//   { tokenId: "ctyrlistek", count: 0, upgrade: 3, straight: false },
//   { tokenId: "moucha", count: 0, upgrade: 1, straight: false },
// ];

// export const CUSTOM_PLAYER_STATS : IStats = {
//     points: 0,
//     coins: 0,
//     strike: 0,
// };

// export const CUSTOM_PLAYER: IPlayer = {
//   id: "matej",
//   name: "Matěj",
//   title: "Král netopýrů",
//   stats: CUSTOM_PLAYER_STATS,
//   tokens: CUSTOM_PLAYER_TOKENS
// };


