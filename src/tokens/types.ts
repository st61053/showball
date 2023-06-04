export interface ITokenState {
    selectedToken?: IToken;
    tokens?: IToken[]
}


export interface IToken {
    id: number,
    name: string,
    img: string
}