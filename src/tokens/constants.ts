import { IToken } from "./types";

import slimak from "../images/tokens/slimak-500.png";
import krtek from "../images/tokens/krtek-500.png";
import mozek from "../images/tokens/mozek-500.png";
import laso from "../images/tokens/laso-500.png";
import slon from "../images/tokens/slon-500.png";
import netopyr from "../images/tokens/netopyr-500.png";
import kozel from "../images/tokens/kozel-500.png";
import kanon from "../images/tokens/kanon-500.png";
import ctyrlistek from "../images/tokens/ctyrlistek-500.png";
import moucha from "../images/tokens/moucha-500.png";

import fire from "../images/resources/fire.png";
import coin from "../images/resources/coin.png";
import logo from "../images/resources/logo_v2.png";
import straight from "../images/resources/straight.png";

const PLUGIN = "TOKENS";

export const CHANGE_SELECTED_TOKEN = `${PLUGIN}_change_selected_token`;
export const LOAD_TOKENS = `${PLUGIN}_load_tokens`;

export const TOKENS: IToken[] = [
  { id: 0, name: "slimák", img: slimak },
  { id: 1, name: "krtek", img: krtek },
  { id: 2, name: "mozek", img: mozek },
  { id: 3, name: "laso", img: laso },
  { id: 4, name: "slon", img: slon },
  { id: 5, name: "netopýr", img: netopyr },
  { id: 6, name: "kozel", img: kozel },
  { id: 7, name: "kanón", img: kanon },
  { id: 8, name: "čtyřlístek", img: ctyrlistek },
  { id: 9, name: "moucha", img: moucha },

];


export const IMAGES_RESOURCES = {
  fire: fire,
  coin: coin,
  logo: logo,
  straight: straight
}