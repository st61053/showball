import { Box, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../global";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

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
import { TOKENS_IMAGE_LIST } from "../../tokens/constants";

const TokenParticles = () => {

    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

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

    return (

        <Box
            sx={{
                height: "100%",
            }}
        >
            {LOGIN_PLAYER && TOKEN_PARTICLES && TOKEN_PARTICLES.length > 0 &&
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
                                speed: 4,
                                straight: false
                            },
                            number: { value: TOKEN_PARTICLES.length },
                            shape: {
                                type: "image",
                                images: TOKEN_PARTICLES
                            },
                            size: {
                                value: 16
                            }
                        }
                    }} />
            }
        </Box>

    );
}

export default TokenParticles;