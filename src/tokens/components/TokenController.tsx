import { Box, Button, Typography } from "@mui/material";
import TokenSwiper from "./TokenSwiper";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";


const TokenController = () => {
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.tokens.selectedToken);
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // justifyContent: "center",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 0.7
                }}
            >
                <Typography
                    variant="h4"
                    textTransform={"uppercase"}
                    sx={{
                        fontWeight: "bold"
                    }}
                >
                    {SELECTED_TOKEN?.name}
                </Typography>
            </Box>

            {/* Token list */}
            <TokenSwiper />


            {/* Button to add */}
            <Box
                sx={{
                    marginTop: "auto",
                    pb: 12
                }}
            >
                <Button
                    variant="contained"
                    sx={{ width: 250, pt: 2, pb: 2 }}
                >

                    <Typography>
                        Přidat
                    </Typography>
                </Button>
            </Box>

        </Box>

    );
}

export default TokenController;