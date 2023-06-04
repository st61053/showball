import { Avatar, Box, Card, Divider, Typography } from "@mui/material";
import { IToken } from "../../tokens/types";
import Token from "../../tokens/components/Token";
import Coin from "./Coin";

const StoreItem = ({ token }: { token: IToken }) => {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 0.5,
                gap: 0.5
            }}
        >
            <Token img={token.img} width={80} />

            <Coin count={55} />
        </Card>
    );
}

export default StoreItem;