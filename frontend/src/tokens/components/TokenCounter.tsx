import { Box, Card, Typography, useTheme } from "@mui/material";
import Token from "./Token";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../global";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { changeSelectedToken } from "../actions";
import { IPlayerToken } from "../../players/types";
import { IToken } from "../types";

const TokenCounter = ({ token }: { token: IToken }) => {
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.tokens.selectedToken);
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5
            }}
        >
            {TOKENS &&
                <Card
                    sx={{
                        borderRadius: "50%",
                        outline: SELECTED_TOKEN?.textId === token.textId ? `2px solid ${theme.palette.primary.main}` : "",
                        // opacity: token.straight ? 1 : 0.5
                    }}
                    onClick={() => dispatch(changeSelectedToken(TOKENS?.find((tok) => tok.textId === token.textId) || TOKENS[0]))}
                >

                    <Token token={TOKENS?.find((tok) => tok.textId === token.textId) || TOKENS[0]} width={30} />

                </Card>
            }

            <Typography
                variant="caption"
                sx={{
                    fontWeight: "bold",
                }}
            >
                {LOGIN_PLAYER.tokens.find((tok) => tok.textId === token.textId)?.count ?? 0}
            </Typography>

        </Box>
    );
}

export default TokenCounter;