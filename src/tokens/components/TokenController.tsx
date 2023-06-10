import { Box, Button, Card, Typography } from "@mui/material";
import TokenSwiper from "./TokenSwiper";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";
import TokenCounter from "./TokenCounter";


const TokenController = () => {
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.tokens.selectedToken);
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);
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


            <Box sx={{width: "100%", p: 2, flex: 0.}}>
                <Card
                    sx={{
                        display: "flex",
                        p: 0.76,
                        margin: "0em 1em",
                        justifyContent: "space-between"
                    }}
                >
                    {TOKENS?.map((token, index) =>
                        <TokenCounter token={token} key={index} />
                    )}

                </Card>
            </Box>


            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 0.5
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