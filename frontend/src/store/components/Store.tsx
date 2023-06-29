import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";
import StoreItem from "./StoreItem";

import Coin from "./Coin";
import ProfileImage from "../../players/components/ProfileImage";
import { PLAYER_IMAGE_LIST } from "../../players/constants";

const Store = () => {
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.store.selectedToken);
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);

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
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={12}>
                        <Card
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                padding: "0.5em 0",
                                gap: 2
                            }}
                        >

                            <Box
                                sx={{
                                    ml: 1
                                }}
                            >
                                <ProfileImage img={PLAYER_IMAGE_LIST[LOGIN_PLAYER.id]} width={50} />
                            </Box>

                            <Typography
                                variant="subtitle1"
                                textTransform={"capitalize"}
                                sx={{
                                    fontWeight: "bold",
                                }}
                            >
                                {LOGIN_PLAYER?.name}
                            </Typography>
                            <Box
                                sx={{ marginLeft: "auto", mr: 1 }}
                            >
                                <Coin count={LOGIN_PLAYER?.stats.coins || 0} />
                            </Box>

                        </Card>
                    </Grid>

                    {
                        TOKENS && TOKENS.map((token, index) =>
                            <Grid item xs={3} key={index}>
                                <StoreItem token={token} />
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
            <Divider />

            {/* Button to add */}
            <Box
                sx={{
                    marginTop: "auto",
                    pb: 12,
                    width: "92%",
                }}
            >
                <Button
                    variant="contained"
                    sx={{ width: "100%", pt: 2, pb: 2, }}
                    disabled={!Boolean(SELECTED_TOKEN)}
                >

                    <Typography>
                        Koupit
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}

export default Store;