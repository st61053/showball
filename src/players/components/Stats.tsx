import { Avatar, Box, Card, Typography, useTheme } from "@mui/material";
import { GlobalState } from "../../global";
import { useSelector } from "react-redux";
import Token from "../../tokens/components/Token";

const Stats = () => {
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);
    const theme = useTheme();
    const avatarCount = TOKENS?.length || 0;

    const renderAvatars = () => {
        const angle = 360 / avatarCount;
        const radius = 125; // Adjust the radius of the circle

        const avatars = [];

        for (let i = 0; i < avatarCount; i++) {
            const rotation = angle * i + 270;
            const style = {
                transform: `rotateZ(${rotation}deg) translate(${radius}px) rotateZ(${-rotation}deg)`,
            };

            avatars.push(
                <Box
                    key={i}
                    sx={{
                        position: 'absolute',
                        top: 'calc(50% + 20px)',
                        left: 'calc(50% - 20px)',
                        // transform: 'translate(-50%, -50%)',
                        // backgroundColor: theme.palette.background.default
                    }}

                    style={style}
                >{TOKENS && <Token token={TOKENS[i]} width={40} />}</Box>
            );
        }

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
                    {TOKENS && <img src={TOKENS[4]?.img} alt="kozel" width={"70%"} height={"70%"}></img>}
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
