export interface ITokenState {
    selectedToken?: IToken;
    tokens?: IToken[]
}

export interface IToken {
    textId: string;
    name: string;
    description: string;
    imageSrc: string;
    levels: ILevel[];
    maxLevel: number;
    state: boolean;
}


export interface ILevel {
    coins: number;
    points: number;
    exps: number;
    nextLevelCost: number;
}

