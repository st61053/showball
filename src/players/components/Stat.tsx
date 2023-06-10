import { Box, Typography } from "@mui/material";

const Stat = ({ count, img }: { count: number, img: string }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
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

export default Stat;