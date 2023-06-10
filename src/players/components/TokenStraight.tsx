import { Box, Card } from "@mui/material";
import Token from "../../tokens/components/Token";
import { IToken } from "../../tokens/types";

const TokenStraight = ({ token }: { token: IToken }) => {
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
                    opacity: token.id === 4 || token.id === 6 || token.id === 1 ? 0.2 : 1
                }}
            >
                <Token token={token} width={30} />
            </Card>
        </Box>
    );
}

export default TokenStraight;