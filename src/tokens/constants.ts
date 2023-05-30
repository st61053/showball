import { IToken } from "./types";
import kozel from "../images/tokens/kozel.png";
import laso from "../images/tokens/laso.png";
import slon from "../images/tokens/slon.png";
import krtek from "../images/tokens/krtek.png";

const PLUGIN = "TOKENS";

export const CHANGE_SELECTED_TOKEN = `${PLUGIN}_change_selected_token`;

export const TOKENS: IToken[] = [
  { id: 0, name: "slimák", img: kozel },
  { id: 1, name: "krtek", img: krtek },
  { id: 2, name: "mozek", img: kozel },
  { id: 3, name: "laso", img: laso },
  { id: 4, name: "slon", img: slon },
  { id: 5, name: "netopýr", img: kozel },
  { id: 6, name: "kozel", img: kozel },
  { id: 7, name: "kanón", img: kozel },
  { id: 8, name: "čtyřlístek", img: kozel },
];
