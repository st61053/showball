export interface ITokenState {
    selectedToken?: IToken;
    tokens?: IToken[]
}

export interface IToken {
    id: string,
    name: string,
    upgrades: ITokenMap,
    points: ITokenMap,
    coins: ITokenMap
}

export interface ITokenMap {
    [key: number]: number,
}
