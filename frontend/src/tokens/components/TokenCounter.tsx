import { Box, Card, Typography, useTheme } from "@mui/material";
import Token from "./Token";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../global";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { changeSelectedToken } from "../actions";
import { IPlayerToken } from "../../players/types";

const TokenCounter = ({ token }: { token: IPlayerToken }) => {
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.tokens.selectedToken);
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
                        outline: SELECTED_TOKEN?.id === token.tokenId ? `2px solid ${theme.palette.primary.main}` : "",
                        opacity: token.straight ? 1 : 0.5
                    }}
                    onClick={() => dispatch(changeSelectedToken(TOKENS?.find((tok) => tok.id === token.tokenId) || TOKENS[0]))}
                >

                    <Token token={TOKENS?.find((tok) => tok.id === token.tokenId) || TOKENS[0]} width={30} />

                </Card>
            }

            <Typography
                variant="caption"
                sx={{
                    fontWeight: "bold",
                }}
            >
                {token.count}
            </Typography>

        </Box>
    );
}

export default TokenCounter;