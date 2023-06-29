export interface ITokenState {
    selectedToken?: IToken;
    tokens?: IToken[]
}

export interface IToken {
    id: string,
    name: string,
    points: number,
    coins: number,
    upgradeCost: ITokenUpgradeCost,
}

export interface ITokenUpgradeCost {
    [key: number]: number,
}
