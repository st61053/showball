import { Box, Typography } from "@mui/material";

const StatItem = ({ count, img, flexDirection = "row" }: { count: number, img : string, flexDirection?: string }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: flexDirection,
                gap: flexDirection === "row" ? 0.5 : 0
            }}
        >
            <Typography
                variant="subtitle1"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
                    lineHeight: 1.2
                }}
            >
                {count}
            </Typography>

            <Box
                sx={{
                    width: 18,
                    height: 18
                }}
            >
                <img src={img} alt={img} width={"100%"} height={"100%"}></img>
            </Box>
        </Box>
    );
}

export default StatItem;