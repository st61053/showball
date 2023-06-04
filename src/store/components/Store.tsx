import { Avatar, Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";
import StoreItem from "./StoreItem";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Coin from "./Coin";

const Store = () => {
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
                            <Avatar sx={{
                                ml: 1,
                                width: 50,
                                height: 50,
                            }}

                            >P</Avatar>
                            <Typography
                                variant="subtitle1"
                                textTransform={"capitalize"}
                                sx={{
                                    fontWeight: "bold",
                                }}
                            >
                                {"Player"}
                            </Typography>
                            <Box
                            sx={{marginLeft: "auto", mr: 1}}
                            >
                                <Coin count={120} />
                            </Box>

                        </Card>
                    </Grid>

                    {
                        TOKENS && TOKENS.map((token, index) =>
                            <Grid item xs={3}>
                                <StoreItem token={token} key={index} />
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