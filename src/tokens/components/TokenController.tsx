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
                alignItems: "center",
                justifyContent: "center",
                height: "100%"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // justifyContent: "space-between",
                    gap: "2em"
                }}
            >
                <Typography
                    variant="h5"
                    textTransform={"uppercase"}
                    sx={{
                        fontWeight: "bold"
                    }}
                >
                    {SELECTED_TOKEN?.name}
                </Typography>

                {/* Token list */}
                <TokenSwiper />

                {/* Button to add */}
                <Box>
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
        </Box>

    );
}

export default TokenController;