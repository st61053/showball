import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import { IMAGES_RESOURCES } from "../../tokens/constants";
import { IPlayer } from "../../players/types";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";

const Place = ({ player, place, option }: { player: IPlayer, place: number, option: string }) => {
    const PLAYERS = useSelector((state: GlobalState) => state.players.players);
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);

    const getMax = () => {
        let min = 0;

        PLAYERS.forEach((player) => {
            if (min < player.stats[option]) {
                min = player.stats[option];
            }
        })
        return min;
    }

    const { t1, t2, t3 } = IMAGES_RESOURCES;

    type ILevelList = {
        [key: number]: {
            bc: string;
            bi: string
        };
    };

    const theme = useTheme();

    const LEVEL_LIST: ILevelList = {
        0: {
            bc: "#000000",
            bi: "linear-gradient(315deg, #000000 0%, #414141 74%)"
        },
        1: {
            bc: "#256eff",
            bi: "linear-gradient(315deg, #256eff 0%, #ffffff 100%)"
        },
        2: {
            bc: "#f9484a",
            bi: "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)"
        },
        3: {
            bc: "#42378f",
            bi: "linear-gradient(315deg, #42378f 0%, #f53844 74%)"
        },
    }

    return (
        <Grid item xs={12}
            sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "0.2em 0.5em",
                gap: 1.5
            }}
        >
            <Box
                sx={{
                    height: 25,
                    width: 25,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {place === 0 && <img src={t1} alt="t1" width={"100%"} height={"100%"}></img>}
                {place === 1 && <img src={t2} alt="t1" width={"100%"} height={"100%"}></img>}
                {place === 2 && <img src={t3} alt="t1" width={"100%"} height={"100%"}></img>}
                {
                    place > 2 &&
                    <Typography
                        variant="body1"
                        textTransform={"capitalize"}
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        {place + 1}
                    </Typography>
                }
            </Box>
            <Typography
                variant="body2"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
                    width: "20%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    color: LOGIN_PLAYER.id === player.id ? theme.palette.primary.main : "black"
                }}
            >
                {player.username}
            </Typography>
            <Card
                sx={{
                    flexGrow: 1,
                    // width: "100%",
                    height: 20,
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    backgroundColor: theme.palette.grey[400]
                }}
            >
                <Card
                    sx={{
                        borderRadius: 20,
                        width: Number(getMax()) === 0 ? "0%" : `${100 / Number(getMax()) * player.stats[option]}%`,
                        height: "100%",
                        backgroundColor: LEVEL_LIST[option === "points" ? 1 : 2]["bc"],
                        backgroundImage: LEVEL_LIST[option === "points" ? 1 : 2]["bi"],
                    }}
                >
                </Card>

                <Typography
                    variant="caption"
                    textTransform={"capitalize"}
                    sx={{
                        ml: "auto",
                        fontWeight: "bold",
                        pr: 1.5,
                        color: "white",
                        lineHeight: 1,
                        zIndex: 100,
                        position: "absolute",
                        right: 0
                    }}
                >
                    {player.stats[option]}
                </Typography>
            </Card>

        </Grid>
    );
}

export default Place;