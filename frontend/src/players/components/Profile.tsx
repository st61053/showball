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

import { Box, Card, Typography, useTheme } from "@mui/material";
import StatItem from "./StatItem";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";
import ProfileImage from "./ProfileImage";

import { IMAGES_RESOURCES, TOKENS_IMAGE_LIST } from "../../tokens/constants";
import { Navigate } from "react-router-dom";
import { PLAYER_IMAGE_LIST } from "../constants";

const Profile = () => {

    const particlesInit = useCallback(async (engine: ImageEngine) => {
        await loadColorUpdater(engine);
        await loadCircleShape(engine);
        await loadBaseMover(engine);
        await loadSizeUpdater(engine);
        await loadOpacityUpdater(engine);
        await loadOutModesUpdater(engine);
        await loadImageShape(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);

    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const IS_LOGGED_IN = useSelector((state: GlobalState) => state.players.isLoggedIn);
    const [TOKEN_PARTICLES, setTokenParticles] = useState([]);

    useEffect(() => {
        setTokenParticles(
            LOGIN_PLAYER.tokens.reduce((prev, token, index) => {
                for (let i = 0; i < token.count; i++) {
                    prev.push({ src: TOKENS_IMAGE_LIST[token.tokenId] })
                }
                return prev;
            }, [] as any)
        );
    }, [LOGIN_PLAYER.tokens])

    const { fire, coin, logo, straight } = IMAGES_RESOURCES;

    const theme = useTheme();
    const avatarCount = 5 || 0;

    const renderStatItems = () => {
        const angle = 110 / avatarCount;
        const radius = 175; // Adjust the radius of the circle

        type StatListType = {
            [key: number]: JSX.Element;
        };

        const STAT_LIST: StatListType = {
            0: <StatItem flexDirection="column" count={LOGIN_PLAYER?.stats.strike || 0} img={fire} />,
            1: <StatItem flexDirection="column" count={
                LOGIN_PLAYER.tokens.reduce((prev, token) => token.straight ? prev + 1 : prev, 0)
            } img={straight} />,
            2: <StatItem flexDirection="column" count={LOGIN_PLAYER?.stats.points || 0} img={logo} />,
            3: <StatItem flexDirection="column" count={LOGIN_PLAYER?.stats.coins || 0} img={coin} />,
        }

        const stats = Object.keys(STAT_LIST).reduce((prev, stat, index) => {
            const ROTATION = angle * index + 237;
            const STYLE = {
                transform: `rotateZ(${ROTATION}deg) translate(${radius}px) rotateZ(${-ROTATION}deg)`,
            };

            prev[index] = (
                <Card
                    key={index}
                    sx={{
                        position: 'absolute',
                        top: 'calc(50% + 25px)',
                        left: 'calc(50% - 25px)',
                        // outline: `2px solid ${theme.palette.primary.main}`,
                        borderRadius: "50%",
                        width: 50,
                        height: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}

                    style={STYLE}
                >
                    {STAT_LIST[index]}
                </Card>
            );
            return prev;
        }, [] as any);
        return stats;
    };

    return (
        <>
            {!IS_LOGGED_IN && (
                <Navigate to="/login" replace={true} />
            )}
            {LOGIN_PLAYER && TOKEN_PARTICLES && TOKEN_PARTICLES.length > 0 && <Box
                sx={{
                    position: "absolute",
                    height: "100%",
                    zIndex: -1
                }}
            >

                <Particles
                    init={particlesInit}
                    loaded={particlesLoaded}
                    options={{
                        fullScreen: { enable: false },
                        fpsLimit: 120,
                        particles: {
                            reduceDuplicates: true,
                            color: { value: "#ffffff" },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: "bounce",
                                random: false,
                                speed: 7,
                                straight: false
                            },
                            number: { value: TOKEN_PARTICLES.length },
                            shape: {
                                type: "image",
                                images: TOKEN_PARTICLES
                            },
                            size: {
                                value: 30
                            }
                        }
                    }} />
            </Box>}

            {LOGIN_PLAYER && <Box
                sx={{
                    display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    height: '100%',
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: 300,
                        height: 300,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "80px"
                    }}

                >
                    <ProfileImage img={PLAYER_IMAGE_LIST[LOGIN_PLAYER.id]} width={250} />
                    {renderStatItems()}
                </Box>

                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 0.1,
                        p: 0.5,
                        width: 250,
                        zIndex: 100
                    }}
                >
                    {/* Player Name */}
                    <Typography
                        variant="h5"
                        textTransform={"capitalize"}
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        {LOGIN_PLAYER.name}
                    </Typography>

                    {/* Player Title */}
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: "bold",
                            color: theme.palette.grey[500]
                        }}
                    >
                        {LOGIN_PLAYER.title}
                    </Typography>
                </Card>

            </Box>}</>
    );
}

export default Profile;
