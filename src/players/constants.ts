
import matej from "../images/players/matej_v2.png";
import { IPlayer } from "./types";

const PLUGIN = 'PLAYERS';

export const COUNTER = `${PLUGIN}_counter`;


export const PLAYERS: IPlayer[] = [
    { id: 0, name: "Matěj", img: matej },
  ];