import { Card } from "@mui/material";
import { IToken } from "../types";

const Token = ({ token, width }: { token: IToken, width: number }) => {
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
            <img src={token.img} alt="kozel" width={"70%"} height={"70%"}></img>

        </Card>
    );
}

export default Token;