import { Avatar, Box, Card, Grid, Typography, useTheme } from "@mui/material";
import { GlobalState } from "../../global";
import { useSelector } from "react-redux";
import Token from "../../tokens/components/Token";
import { border, borderRadius } from "@mui/system";
import { PLAYERS } from "../constants";
import Stat from "./Stat";

// resource images
import fire from "../../images/resources/fire.png";
import coin from "../../images/resources/coin.png";
import logo from "../../images/resources/logo_v2.png";
import straight from "../../images/resources/straight.png";
import ranking from "../../images/resources/ranking.png";
import TokenStraight from "./TokenStraight";

const Stats = () => {
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);
    const theme = useTheme();
    const avatarCount = 5 || 0;

    const renderAvatars = () => {
        const angle = 110 / avatarCount;
        const radius = 175; // Adjust the radius of the circle

        type StatListType = {
            [key: number]: JSX.Element;
        };



        const STAT_LIST: StatListType = {
            0: <Stat count={3} img={fire} />,
            1: <Stat count={6} img={straight} />,
            2: <Stat count={55} img={logo} />,
            3: <Stat count={55} img={coin} />,
        }

        const avatars = Object.keys(STAT_LIST).reduce((prev, stat, index) => {
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
                        // transform: 'translate(-50%, -50%)',
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
                    {<img src={PLAYERS[0].img} alt="kozel" width={"100%"} height={"100%"}></img>}
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

            {/* <Box sx={{ width: "100%", p: 2, pt: 4}}>
                <Card
                    sx={{
                        display: "flex",
                        p: 0.76,
                        margin: "0em 1em",
                        justifyContent: "space-between"
                    }}
                >
                    {TOKENS?.map((token, index) =>
                        <TokenStraight token={token} key={index} />
                    )}

                </Card>

            </Box> */}

        </Box>
    );
}

export default Stats;
