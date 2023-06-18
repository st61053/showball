
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadBaseMover } from "tsparticles-move-base";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadImageShape } from "tsparticles-shape-image";
import Particles from "react-tsparticles";
import { ImageEngine } from "tsparticles-shape-image/types/types";
import { useCallback } from "react";
import type { Container } from "tsparticles-engine";

import { TOKENS } from "../../tokens/constants";


const Test = () => {

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

    return (
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
                        speed: 3,
                        straight: false
                    },
                    number: { value: 10 },
                    shape: {
                        type: "image",
                        image: [
                            { src: TOKENS[0].img },
                            { src: TOKENS[1].img },
                            { src: TOKENS[2].img },
                            { src: TOKENS[3].img },
                            { src: TOKENS[4].img },
                            { src: TOKENS[5].img },
                            { src: TOKENS[6].img },
                            { src: TOKENS[7].img },
                            { src: TOKENS[8].img },
                            { src: TOKENS[9].img },
                        ]
                    },
                    size: {
                        value: 40
                    }
                }
            }}
        />
    );
}

export default Test;