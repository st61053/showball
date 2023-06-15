import { IToken } from "../tokens/types";

export interface IPlayerState {
    players: IPlayer[];
    loginPlayer: IPlayer;
    test: number;
}

export interface IPlayer {
    id: number;
    name: string;
    img: string;
    stats : Stats;
    straightTokens?: IToken[];
}

export interface Stats {
    points: number;
    coins: number;
    strike: number;
}