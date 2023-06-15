import { Box, Typography } from "@mui/material";
import { IMAGES_RESOURCES } from "../../tokens/constants";
import StatItem from "../../players/components/StatItem";

const RowPlace = ({ place }: { place: number }) => {
    const { logo } = IMAGES_RESOURCES;
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

            <Box
                sx={{
                    marginLeft: "auto"
                }}
            >
                <StatItem count={55} img={logo} />
            </Box>
        </Box>
    );
}

export default RowPlace;