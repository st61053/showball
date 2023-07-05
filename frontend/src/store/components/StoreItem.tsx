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
    const TOKEN = LOGIN_PLAYER.tokens.find((tok) => tok.tokenId === token.id);

    const theme = useTheme();
    return (
        <>
            {TOKEN && <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 0.5,
                    gap: 1,
                    outline: SELECTED_TOKEN?.id === token.id ? `2px solid ${theme.palette.primary.main}` : ""
                }}
                onClick={() => dispatch(changeSelectedToken(token))}
            >
                <Token token={token} width={65} />

                {
                    TOKEN.upgrade < 3 
                    ? <Coin count={token.upgrades[TOKEN.upgrade]} /> :
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

            </Card>}
        </>

    );
}

export default StoreItem;