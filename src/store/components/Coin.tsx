import { Box, Typography } from "@mui/material";
import coin from "../../images/resources/coin.png";

const Coin = ({ count }: { count: number }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5
            }}
        >
            <Typography
                variant="subtitle1"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
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