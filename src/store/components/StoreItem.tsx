import { Card, useTheme } from "@mui/material";
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
    const theme = useTheme();
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 0.5,
                gap: 0.5,
                outline: SELECTED_TOKEN?.id === token.id ? `2px solid ${theme.palette.primary.main}` : ""
            }}
            onClick={() => dispatch(changeSelectedToken(token))}
        >
                <Token token={token} width={80} />

            <Coin count={55} />
        </Card>
    );
}

export default StoreItem;