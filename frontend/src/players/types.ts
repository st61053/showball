export interface IPlayerState {
    players: IPlayer[];
    loginPlayer: IPlayer;
    isLoggedIn: boolean;
    spin: boolean;
}

export interface IPlayer {
    id: string;
    name: string;
    title: string;
    stats : IStats;
    tokens: IPlayerToken[];
}

export interface IStats {
    points: number;
    coins: number;
    strike: number;
}

export interface IPlayerToken {
    tokenId: string;
    count: number;
    upgrade: number;
    straight: boolean;
}