import { Box, Typography } from "@mui/material";
import coin from "../../images/resources/coin.png";

const Coin = ({ count, flexDirection = "row" }: { count: number, flexDirection?: string }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: flexDirection,
                gap: flexDirection === "row" ? 0.5 : 0
            }}
        >
            <Typography
                variant="subtitle2"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
                    lineHeight: 1.2
                }}
            >
                {count}
            </Typography>

            <Box
                sx={{
                    width: 18,
                    height: 18
                }}
            >
                <img src={coin} alt="coin" width={"100%"} height={"100%"}></img>
            </Box>
        </Box>
    );
}

export default Coin;