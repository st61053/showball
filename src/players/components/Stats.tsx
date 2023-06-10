import { Avatar, Box, Card, Typography, useTheme } from "@mui/material";
import { GlobalState } from "../../global";
import { useSelector } from "react-redux";
import Token from "../../tokens/components/Token";
import { border, borderRadius } from "@mui/system";
import { PLAYERS } from "../constants";
import Stat from "./Stat";

// resource images
import fire from "../../images/resources/fire.png";
import coin from "../../images/resources/coin.png";
import straight from "../../images/resources/straight.png";
import ranking from "../../images/resources/ranking.png";

const Stats = () => {
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);
    const theme = useTheme();
    const avatarCount = 5 || 0;

    const renderAvatars = () => {
        const angle = 130 / avatarCount;
        const radius = 175; // Adjust the radius of the circle

        type StatListType = {
            [key: number]: JSX.Element;
        };



        const STAT_LIST: StatListType = {
            0: <Stat count={3} img={fire}/>,
            1: <Stat count={6} img={straight}/>,
            2: <Stat count={4} img={ranking}/>,
            3: <Stat count={3} img={fire}/>,
            4: <Stat count={55} img={coin}/>,
        }

        const avatars = Object.keys(STAT_LIST).reduce((prev, stat, index) => {
            const ROTATION = angle * index + 220;
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
                        // transform: 'translate(-50%, -50%)',
                        outline: `2px solid ${theme.palette.primary.main}`,
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
        return avatars;
    };

    return (
        <Box
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
                    width: 300, // Adjust the size of the circle by changing the width and height
                    height: 300,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "80px"
                }}

            >
                <Card sx={{
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                    {TOKENS && <img src={PLAYERS[0].img} alt="kozel" width={"100%"} height={"100%"}></img>}
                </Card>
                {renderAvatars()}
            </Box>



            <Typography
                variant="h5"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
                }}
            >
                {"Player"}
            </Typography>
            <Typography
                variant="caption"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
                    color: theme.palette.grey[500]
                }}
            >
                {"Král netopýrů"}
            </Typography>
        </Box>
    );
}

export default Stats;
