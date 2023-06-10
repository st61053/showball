import { Avatar, Box, Typography } from "@mui/material";

const TopPlace = ({ width }: { width: number }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.5
            }}
        >
            <Avatar sx={{
                width: width,
                height: width,
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
    );
}

export default TopPlace;