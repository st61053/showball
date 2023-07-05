import { Box, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";
import { IToken } from "../../tokens/types";

const ProgressBar = ({ title, count, max, level }: { title: string, count: number, max: number, level: number }) => {



    type ILevelList = {
        [key: number]: {
            bc: string;
            bi: string
        };
    };

    const LEVEL_LIST: ILevelList = {
        0: {
            bc: "#000000",
            bi: "linear-gradient(315deg, #000000 0%, #414141 74%)"
        },
        1: {
            bc: "#256eff",
            bi: "linear-gradient(315deg, #256eff 0%, #ffffff 100%)"
        },
        2: {
            bc: "#f9484a",
            bi: "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)"
        },
        3: {
            bc: "#42378f",
            bi: "linear-gradient(315deg, #42378f 0%, #f53844 74%)"
        },
    }

    return (
        <Box
            sx={{
                width: "100%"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pb: 0.2
                }}
            >
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: "bold",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontWeight: "bold",
                    }}
                >
                    {count}
                </Typography>
            </Box>
            <Card
                sx={{
                    width: "100%",
                    height: 7,
                }}
            >
                <Card
                    sx={{
                        width: `${100 / max * count}%`,
                        height: "100%",
                        backgroundColor: LEVEL_LIST[level]["bc"],
                        backgroundImage: LEVEL_LIST[level]["bi"],
                    }}
                >

                </Card>


            </Card>
        </Box>
    );
}

export default ProgressBar;