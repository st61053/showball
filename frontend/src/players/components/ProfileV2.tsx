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
import TokenParticles from "./TokenParticles";
import LogoutIcon from '@mui/icons-material/Logout';

const ProfileV2 = () => {

    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);

    const [REDIRECT, setRedirect] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        const getPlayer = async () => {

            const response = await fetch(`${SEVER_PREFIX}/api/v1/player`, {
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
                                        <img src={PLAYER_IMAGE_LIST[LOGIN_PLAYER.id]} alt={LOGIN_PLAYER.name} height={"100%"}></img>
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
                                                        {LOGIN_PLAYER.name}
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
                                                        {"Lovec mozků"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0.8} sx={{ pt: 1.8, pr: 3 }}>
                                                        <Grid item xs={12}>
                                                            <ProgressBar title="strike" count={LOGIN_PLAYER.stats.strike} max={22} level={3} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <ProgressBar title="points" count={LOGIN_PLAYER.stats.points} max={1000} level={1} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <ProgressBar title="coins" count={LOGIN_PLAYER.stats.coins} max={1000} level={2} />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <ProgressBar title="postupka" count={LOGIN_PLAYER.tokens.reduce((prev, token) => token.straight ? prev + 1 : prev, 0)} max={10} level={0} />
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

                                            <TokenParticles />

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
