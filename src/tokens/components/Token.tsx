import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";

// import kozel from "../../images/tokens/kozel.png";
// import laso from "../../images/tokens/laso.png";
// import slon from "../../images/tokens/slon.png";
// import mozek from "../../images/tokens/mozek.png";

const Token = () => {
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.tokens.selectedToken);
    return (
        <Card
            sx={{
                width: 250,
                height: 250,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer"
            }}
        >
            {/* <CardMedia
            component="img"
            height="100"
            image={kozel}
            alt="Paella dish"
        /> */}

            <img src={SELECTED_TOKEN?.img} alt="kozel" width={"55%"} height={"65%"}></img>
        </Card>
    );
}

export default Token;