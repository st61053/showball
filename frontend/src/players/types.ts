export interface IPlayerState {
    players: IPlayer[];
    loginPlayer: IPlayer;
    isLoggedIn: boolean;
    spin: boolean;
}

export interface IPlayer {
    id: string;
    username: string;
    roles: string[];
    title: string[];
    imageSrc: string;
    stats : IStats;
    tokens: IPlayerToken[];
    challenges: IChallenge[];
}

export interface IStats {
    points: number;
    coins: number;
    exps: number;
    straight: number;
    free_spin: boolean;
}

export interface IPlayerToken {
    textId: string;
    count: number;
    level: number;
}

export interface IChallenge {
    textId: string;
    timestamp: string;
}