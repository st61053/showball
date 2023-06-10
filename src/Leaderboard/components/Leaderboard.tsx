import { Box, Card, Divider } from "@mui/material";
import TopPlace from "./TopPlace";
import RowPlace from "./RowPlace";

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
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "space-between",
                    }}
                >
                    <TopPlace width={90} />
                    <TopPlace width={115} />
                    <TopPlace width={90} />

                </Box>
                <Divider />

                <Box
                    sx={{
                        padding: "1em 2em",
                        display: "flex",
                        // alignItems: "center",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((player, index) =>
                        <RowPlace key={index} place={index + 4} />
                    )}

                </Box>

            </Card>
        </Box>
    );
}

export default Leaderboard;