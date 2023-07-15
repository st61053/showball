import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../global";
import StoreItem from "./StoreItem";

import Coin from "./Coin";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { loginPlayer } from "../../players/actions";
import StatItem from "../../players/components/StatItem";
import { IMAGES_RESOURCES } from "../../tokens/constants";

const Store = () => {
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.store.selectedToken);
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const TOKEN = LOGIN_PLAYER.tokens.find((token) => token.tokenId === SELECTED_TOKEN?.id);
    const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

    const { coin } = IMAGES_RESOURCES;


    const upgradeToken = async () => {
        if (localStorage.access_token) {

            const response = await fetch(`${SEVER_PREFIX}/api/v1/upgrade-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
                },
                body: JSON.stringify({ token_id: SELECTED_TOKEN?.id, free: false })
            })

            const json = await response.json();

            if (response.ok) {
                dispatch(loginPlayer(json));
            }

        }
    }

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
                                padding: "1.15em 0",
                                gap: 2
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                textTransform={"capitalize"}
                                sx={{
                                    fontWeight: "bold",
                                    ml: 1.5
                                }}
                            >
                                {`Obchod`}
                            </Typography>
                            <Box
                                sx={{ marginLeft: "auto", mr: 1.5 }}
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

            {/* Button to add */}
            <Box
                sx={{
                    marginTop: "auto",
                    pb: 10,
                    width: "92%",
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: "100%",
                        pt: 2,
                        pb: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                    }}
                    disabled={
                        !Boolean(SELECTED_TOKEN) 
                        || Boolean(TOKEN && SELECTED_TOKEN && SELECTED_TOKEN?.upgrades[TOKEN?.upgrade] > LOGIN_PLAYER.stats.coins)
                        || Boolean(TOKEN && TOKEN?.upgrade > 2)
                    }
                    onClick={() => upgradeToken()}
                >

                    {
                        TOKEN
                            ? <Typography> {TOKEN?.upgrade < 3 ? "Vylepšit!" : "Max vylepšení!"} </Typography>
                            : <Typography> {"Vylepšit!"} </Typography>
                    }
                    {TOKEN && SELECTED_TOKEN && TOKEN?.upgrade < 3 && <Typography>{`(`}</Typography>}
                    {TOKEN && SELECTED_TOKEN && TOKEN?.upgrade < 3 && <StatItem count={SELECTED_TOKEN?.upgrades[TOKEN?.upgrade]} img={coin} />}
                    {TOKEN && SELECTED_TOKEN && TOKEN?.upgrade < 3 && <Typography>{`)`}</Typography>}
                </Button>
            </Box>
        </Box >
    );
}

export default Store;