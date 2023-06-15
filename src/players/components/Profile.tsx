import { Box, Card, Typography, useTheme } from "@mui/material";
import StatItem from "./StatItem";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";
import ProfileImage from "./ProfileImage";

import { IMAGES_RESOURCES } from "../../tokens/constants";



const Profile = () => {
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);

    const { points, coins, strike } = LOGIN_PLAYER.stats;
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
            0: <StatItem flexDirection="column" count={strike} img={fire} />,
            1: <StatItem flexDirection="column" count={6} img={straight} />,
            2: <StatItem flexDirection="column" count={points} img={logo} />,
            3: <StatItem flexDirection="column" count={coins} img={coin} />,
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
                <ProfileImage img={LOGIN_PLAYER.img} width={250} />
                {renderStatItems()}
            </Box>

            {/* Player Name */}
            <Typography
                variant="h5"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
                }}
            >
                {"Player"}
            </Typography>

            {/* Player Title */}
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

export default Profile;
