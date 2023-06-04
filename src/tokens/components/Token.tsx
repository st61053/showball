import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";

const Token = ({img, width} : {img: string, width: number}) => {
    return (
        <Card
            sx={{
                width: width,
                height: width,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img src={img} alt="kozel" width={"70%"} height={"70%"}></img>
        </Card>
    );
}

export default Token;