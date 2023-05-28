import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import kozel from "../../images/tokens/kozel-100.png";


const TokenController = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "4em"
                }}
            >
                {/* Token list */}
                <Box>
                    <Card
                        sx={{
                            width: 250,
                            height: 250,
                            borderRadius: "50%"
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="250"
                            image="../../images/tokens/kozel-100.png"
                            alt="Paella dish"
                        />
                    </Card>
                </Box>

                {/* Button to add */}
                <Box>
                    <Button
                        variant="contained"
                        sx={{ width: 250, pt: 2, pb: 2 }}
                    >

                        <Typography>
                            Přidat
                        </Typography>
                    </Button>
                </Box>


            </Box>
        </Box>

    );
}

export default TokenController;