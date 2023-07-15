import { Box, Button, Card, Grid, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../global";
import StatItem from "../../players/components/StatItem";
import { IMAGES_RESOURCES } from "../../tokens/constants";
import Place from "./Place";
import { useState } from "react";
import { initPlayers } from "../../players/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const Leaderboard = () => {

    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);
    const PLAYERS = useSelector((state: GlobalState) => state.players.players);
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const { logo, coin } = IMAGES_RESOURCES;
    const [option, setOption] = useState("points");
    const theme = useTheme();

    type IKeyImage = {
        [key: string]: string;
    };

    const ICON_LIST: IKeyImage = {
        "points": logo,
        "coins": coin
    };

    const getPlayers = async () => {

        if (localStorage.access_token) {
            const response = await fetch(`${SEVER_PREFIX}/api/v1/players`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
                },
            })

            const json = await response.json();

            if (response.ok) {
                dispatch(initPlayers(json.players))
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
                <Grid container sx={{ p: 2, pb: 10, height: "100%" }}>
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            width: "100%",
                            flexDirection: "column",
                            gap: 2
                        }}
                    >
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
                                {`Žebříček`}
                            </Typography>
                            <Box
                                sx={{ marginLeft: "auto", mr: 1.5 }}
                            >
                                <StatItem count={LOGIN_PLAYER?.stats[option] || 0} img={ICON_LIST[option]} />
                            </Box>

                        </Card>
                        <Card
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Button
                                variant="text"
                                sx={{ p: 0, ml: 0.3, pt: 1, pb: 1 }}
                                onClick={() => {
                                    getPlayers();
                                    setOption("points");
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    textTransform={"lowercase"}
                                    sx={{
                                        fontWeight: "bold",
                                        color: option === "points" ? theme.palette.primary.main : "black"
                                    }}
                                >
                                    {`points`}
                                </Typography>
                            </Button>
                            <Button
                                variant="text"
                                sx={{ p: 0, pt: 1, pb: 1 }}
                                onClick={() => {
                                    getPlayers();
                                    setOption("coins");
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    textTransform={"lowercase"}
                                    sx={{
                                        fontWeight: "bold",
                                        color: option === "coins" ? theme.palette.primary.main : "black"
                                    }}
                                >
                                    {`coins`}
                                </Typography>
                            </Button>

                        </Card>
                        <Card
                            sx={{
                                display: "flex",
                                width: "100%",
                                alignItems: "start",
                                flexGrow: 1,
                                gap: 2
                            }}
                        >
                            <Grid container sx={{ p: "1em 0.5em" }}>
                                {
                                    PLAYERS
                                        .sort((a, b) => b.stats[option] - a.stats[option])
                                        //.filter((player) => player.stats[option] != 0)
                                        .map((player, place) => <Place player={player} place={place} option={option} key={place} />)
                                }

                            </Grid>


                        </Card>
                    </Box>
                </Grid>
            </Box >
        </Box >
    );
}

export default Leaderboard;

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
