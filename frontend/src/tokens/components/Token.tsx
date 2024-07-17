import { Card } from "@mui/material";
import { TOKENS_IMAGE_LIST } from "../constants";
import { IToken } from "../types";
import { useSelector } from "react-redux";
import { GlobalState } from "../../global";
import { useEffect } from "react";

const Token = ({ token, width }: { token: IToken, width: number }) => {
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const TOKEN = LOGIN_PLAYER.tokens.find((tok) => tok.textId === token?.textId);
    const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);

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
            bc: "#ffffff",
            bi: "linear-gradient(315deg, #ffffff 0%, #ffffff 100%)"
        },
        2: {
            bc: "#256eff",
            bi: "linear-gradient(315deg, #256eff 0%, #ffffff 74%)"
        },
        3: {
            bc: "#f9484a",
            bi: "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)"
        },
        4: {
            bc: "#42378f",
            bi: "linear-gradient(315deg, #42378f 0%, #f53844 74%)"
        },
    }

    const SHADOW_LIST = {

    }

    return (
        <>
            <Card
                sx={{
                    width: width,
                    height: width,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: LEVEL_LIST[TOKEN?.level ?? 0]["bc"],
                    backgroundImage: LEVEL_LIST[TOKEN?.level ?? 0]["bi"],


                }}
            >
                <img 
 
                style={{
                    filter: width > 70 ? "drop-shadow(2px 1px 3px white)" : "drop-shadow(0.5px 0.5px 1px white)"
                }}

                src={`${SEVER_PREFIX}/${token.imageSrc}`} alt="kozel" width={"70%"} height={"70%"}></img>
        </Card >
        </>
    );
}

export default Token;