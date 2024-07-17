import { loadColorUpdater } from "tsparticles-updater-color";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadBaseMover } from "tsparticles-move-base";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadImageShape } from "tsparticles-shape-image";
import Particles from "react-tsparticles";
import { ImageEngine } from "tsparticles-shape-image/types/types";
import { useCallback, useEffect, useState } from "react";
import type { Container } from "tsparticles-engine";

import { Box, Card, Grid, IconButton, Typography, useTheme } from "@mui/material";
import StatItem from "./StatItem";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../global";
import ProfileImage from "./ProfileImage";

import { IMAGES_RESOURCES, TOKENS_IMAGE_LIST } from "../../tokens/constants";
import { Navigate } from "react-router-dom";
import { PLAYER_IMAGE_LIST } from "../constants";
import { loginPlayer, logoutPlayer } from "../actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { IPlayer } from "../types";
import { access } from "fs";
import ProgressBar from "./ProgressBar";
import LogoutIcon from '@mui/icons-material/Logout';
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

const ProfileV2 = () => {

    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);
    const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);
    const PLAYERS = useSelector((state: GlobalState) => state.players.players);

    const [REDIRECT, setRedirect] = useState(false);
    const theme = useTheme();

    const getMax = (option) => {
        let min = 0;

        PLAYERS.forEach((player) => {
            if (min < player.stats[option]) {
                min = player.stats[option];
            }
        })
        return min;
    }

    useEffect(() => {
        const getPlayer = async () => {

            const response = await fetch(`${SEVER_PREFIX}/api/v1/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
                }
            })

            const json = await response.json();

            if (response.ok) {
                dispatch(loginPlayer(json))
            } else {
                localStorage.removeItem('access_token');
                setRedirect(true);
            }
        }

        if (localStorage.access_token) {
            getPlayer();
        } else {
            setRedirect(true);
        }

    }, [])

    const logOut = () => {
        dispatch(logoutPlayer());
        localStorage.removeItem('access_token');
        setRedirect(true);
    }

    const missingToStraightCount = () => {
        return LOGIN_PLAYER.tokens.reduce((accumulator, currentValue) => accumulator + Number(currentValue.count > LOGIN_PLAYER.stats.straight), 0)
    }

    const tokensCounts = () => {
        return TOKENS.map(t => {
            const playerToken = LOGIN_PLAYER.tokens.find((ts) => ts.textId === t.textId);

            return playerToken ? playerToken.count : 0;
        })
    }

    const categoriesWithImages = TOKENS.map((t) => { return `<img src=${SEVER_PREFIX}/${t.imageSrc} alt="Sales" style="width: 25px; height: 25px;" />` });

    return (
        <>
            {!sessionStorage["access_token"] && REDIRECT && <Navigate to="/login" replace={true} />}

            {
                LOGIN_PLAYER &&
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
                                        padding: "0.8em 0",
                                        gap: 2
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        textTransform={"capitalize"}
                                        sx={{
                                            fontWeight: "bold",
                                            ml: 2
                                        }}
                                    >
                                        {`Showball`}
                                    </Typography>
                                    <Box
                                        sx={{ marginLeft: "auto", mr: 1 }}
                                    >
                                        <IconButton
                                            aria-label="delete"
                                            color="primary"
                                            onClick={logOut}
                                        >
                                            <LogoutIcon />
                                        </IconButton>
                                    </Box>

                                </Card>

                                <Card
                                    sx={{
                                        height: 250,
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: "100%",
                                            width: 180
                                        }}
                                    >
                                        {
                                            LOGIN_PLAYER.imageSrc
                                                ? <img src={`${SEVER_PREFIX}/${LOGIN_PLAYER.imageSrc}`} alt={LOGIN_PLAYER.username} height={"100%"}></img>
                                                : <img src={PLAYER_IMAGE_LIST["placeholder"]} alt={LOGIN_PLAYER.username} height={"100%"}></img>
                                        }

                                    </Box>
                                    <Box
                                        sx={{
                                            height: "100%",
                                            width: "calc(100% - 180px)",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "100%",
                                            }}
                                        >
                                            <Grid container spacing={0} sx={{ pt: 2, pl: 1.5 }}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        variant="h5"
                                                        textTransform={"capitalize"}
                                                        sx={{
                                                            fontWeight: "bold",
                                                            pb: 0
                                                        }}
                                                    >
                                                        {LOGIN_PLAYER.username}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: "bold",
                                                            color: theme.palette.grey[500]
                                                        }}
                                                    >
                                                        {LOGIN_PLAYER.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0.8} sx={{ pt: 1.8, pr: 3 }}>
                                                        <Grid item xs={12}>
                                                            <ProgressBar title="points" count={LOGIN_PLAYER.stats.points} max={getMax("points")} level={1} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <ProgressBar title="coins" count={LOGIN_PLAYER.stats.coins} max={getMax("coins")} level={2} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <ProgressBar title="postupka" count={missingToStraightCount()} max={TOKENS.length} level={0} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Card>

                                <Card
                                    sx={{
                                        flexGrow: 1,
                                        width: "100%",
                                    }}
                                >
                                    <Grid container spacing={1} sx={{ p: 2, height: "100%" }}>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {"Přehled provedených pozic"}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}
                                            sx={{
                                                height: "calc(100% - 22px)"
                                            }}
                                        >
                                            <HighchartsReact
                                                highcharts={Highcharts}
                                                containerProps={{ style: { height: "100%", width: "100%" } }}
                                                options={{
                                                    chart: {
                                                        polar: true,
                                                        type: 'line'
                                                    },
                                                    title: {
                                                        text: null,
                                                    },

                                                    pane: {
                                                        size: '80%'
                                                    },

                                                    xAxis: {
                                                        categories: categoriesWithImages,
                                                        tickmarkPlacement: 'on',
                                                        lineWidth: 0,
                                                        labels: {
                                                            useHTML: true,
                                                            formatter: function () {
                                                                return this.value;
                                                            },
                                                            style: {
                                                                whiteSpace: 'nowrap'
                                                            }
                                                        }
                                                    },

                                                    yAxis: {
                                                        gridLineInterpolation: 'polygon',
                                                        lineWidth: 0,
                                                        min: 0,
                                                        tickInterval: 2
                                                    },

                                                    tooltip: {
                                                        enabled: false,
                                                        shared: true,
                                                        pointFormat: '<span>' +
                                                            '{point.y:,.0f}<br/>'
                                                    },

                                                    legend: {
                                                        enabled: false,
                                                    },

                                                    series: [{
                                                        name: 'Allocated Budget',
                                                        //data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                                        data: tokensCounts(),
                                                        pointPlacement: 'on'
                                                    }],

                                                    responsive: {
                                                        rules: [{
                                                            condition: {
                                                                maxWidth: 500
                                                            },
                                                            chartOptions: {
                                                                legend: {
                                                                    align: 'center',
                                                                    verticalAlign: 'bottom',
                                                                    layout: 'horizontal'
                                                                },
                                                                pane: {
                                                                    size: '70%'
                                                                }
                                                            }
                                                        }]
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            }

        </>
    );
}

export default ProfileV2;
