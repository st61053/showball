import { Avatar, Box, Typography } from "@mui/material";
import Stats from "./Stats";

const Profile = () => {
    return (
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
                    border: "1px solid red",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    p: 8
                }}
            >
                <Avatar sx={{
                    width: 200,
                    height: 200,
                }}

                >P</Avatar>
                <Typography
                    variant="subtitle1"
                    textTransform={"capitalize"}
                    sx={{
                        fontWeight: "bold",
                    }}
                >
                    {"Player"}
                </Typography>

            </Box>
            <Stats />

        </Box>
    );
}

export default Profile;