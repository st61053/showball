import { Box, Card, Typography, useTheme } from "@mui/material";
import { IToken } from "../types";
import Token from "./Token";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../global";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { changeSelectedToken } from "../actions";

const TokenCounter = ({ token }: { token: IToken }) => {
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.tokens.selectedToken);
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
            <Card
                sx={{
                    borderRadius: "50%",
                    outline: SELECTED_TOKEN?.id === token.id ? `2px solid ${theme.palette.primary.main}` : ""
                }}
                onClick={() => dispatch(changeSelectedToken(token))}
            >
                <Token token={token} width={30} />
            </Card>

            <Typography
                variant="caption"
                sx={{
                    fontWeight: "bold",
                }}
            >
                {`55`}
            </Typography>

        </Box>
    );
}

export default TokenCounter;