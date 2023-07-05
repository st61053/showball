import { Card } from "@mui/material";
import { TOKENS_IMAGE_LIST } from "../constants";
import { IToken } from "../types";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";

const Token = ({ token, width }: { token: IToken, width: number }) => {
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const TOKEN = LOGIN_PLAYER.tokens.find((tok) => tok.tokenId === token?.id);

    type ILevelList = {
        [key: number]: {
            bc: string;
            bi: string
        };
    };


    const LEVEL_LIST: ILevelList = {
        0: {
            bc: "#ffffff",
            bi: "linear-gradient(315deg, #ffffff 0%, #ffffff 100%)"
        },
        1: {
            bc: "#256eff",
            bi: "linear-gradient(315deg, #256eff 0%, #ffffff 74%)"
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

    const SHADOW_LIST = {

    }

    return (
        <>
            {TOKEN && <Card
                sx={{
                    width: width,
                    height: width,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: LEVEL_LIST[TOKEN?.upgrade]["bc"],
                    backgroundImage: LEVEL_LIST[TOKEN?.upgrade]["bi"],


                }}
            >
                <img 
 
                style={{
                    filter: width > 70 ? "drop-shadow(2px 1px 3px white)" : "drop-shadow(0.5px 0.5px 1px white)"
                }}

                src={TOKENS_IMAGE_LIST[token?.id]} alt="kozel" width={"70%"} height={"70%"}></img>
        </Card >}
        </>
    );
}

export default Token;