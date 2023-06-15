import { IPlayer } from "../../players/types";
import ProfileImage from "../../players/components/ProfileImage";
import { IMAGES_RESOURCES } from "../../tokens/constants";
import { useState } from "react";
import { Box, Card, Typography } from "@mui/material";

const TopPlace = ({ width, player }: { width: number, player: IPlayer }) => {

    const { logo } = IMAGES_RESOURCES;
    const [flip, setFlip] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5
            }}
        >

            <Card
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    width: width,
                    height: width,
                    position: "relative"
                }}
                onClick={() => setFlip((flip) => !flip)}
            >
                {flip ? <img style={{opacity: 0.8}} src={logo} alt={logo} width={"70%"} height={"70%"}></img> : <ProfileImage img={player.img} width={width} />}
                {flip && <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        position: "absolute"
                    }}
                >
                    {100}
                </Typography>}
            </Card>

            <Typography
                variant="subtitle1"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
                }}
            >
                {player ? player?.name : "Player"}
            </Typography>


        </Box>
    );
}

export default TopPlace;