import { Box, Typography } from "@mui/material";

const RowPlace = ({ place }: { place: number }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <Typography
                variant="subtitle1"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
                    flex: 0.25
                }}
            >
                {`#${place}\t`}
            </Typography>

            <Typography
                variant="subtitle1"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
                }}
            >
                {`Player`}
            </Typography>

            <Typography
                variant="subtitle1"
                textTransform={"capitalize"}
                sx={{
                    fontWeight: "bold",
                    marginLeft: "auto"
                }}
            >
                {`55`}
            </Typography>
        </Box>
    );
}

export default RowPlace;