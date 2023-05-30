export interface ITokenState {
    selectedToken?: IToken;
}


export interface IToken {
    id: number,
    name: string,
    img: string
}