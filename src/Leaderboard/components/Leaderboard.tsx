import { Avatar, Box, Card, Typography } from "@mui/material";

const Leaderboard = () => {
    return (
        <Box
            sx={{
                height: "100%",
                p: 2
            }}
        >
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "center",
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.5
                        }}
                    >
                        <Avatar sx={{
                            width: 95,
                            height: 95,
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.5
                        }}
                    >
                        <Avatar sx={{
                            width: 110,
                            height: 110,
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 0.5
                        }}
                    >
                        <Avatar sx={{
                            width: 95,
                            height: 95,
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

                </Box>

            </Card>
        </Box>
    );
}

export default Leaderboard;