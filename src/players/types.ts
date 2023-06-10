export interface IPlayerState {
    players: IPlayer[];
    test: number;
}

export interface IPlayer {
    id: number;
    name: string;
    img: string;
}