import { Card, Typography, useTheme } from "@mui/material";
import { IToken } from "../../tokens/types";
import Token from "../../tokens/components/Token";
import Coin from "./Coin";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { changeSelectedToken } from "../actions";
import { GlobalState } from "../../global";

const StoreItem = ({ token }: { token: IToken }) => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.store.selectedToken);
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const TOKEN = LOGIN_PLAYER.tokens.find((tok) => tok.textId === token.textId);

    const theme = useTheme();
    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 0.5,
                    gap: 1,
                    outline: SELECTED_TOKEN?.textId === token.textId ? `2px solid ${theme.palette.primary.main}` : ""
                }}
                onClick={() => dispatch(changeSelectedToken(token))}
            >
                <Token token={token} width={65} />
                {!TOKEN
                    ? <Coin count={TOKEN ? token.levels[TOKEN?.level ? TOKEN?.level - 1 : 0].nextLevelCost : token.levels[0].nextLevelCost} />
                    :

                    TOKEN?.level < 4
                        ? <Coin count={TOKEN ? token.levels[TOKEN?.level ? TOKEN?.level - 1 : 0].nextLevelCost : token.levels[0].nextLevelCost} /> :
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: "bold",
                                lineHeight: 1.2
                            }}
                        >
                            max
                        </Typography>

                }



            </Card>
        </>

    );
}

export default StoreItem;