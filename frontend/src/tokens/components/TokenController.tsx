import { Box, Button, Card, Typography } from "@mui/material";
import TokenSwiper from "./TokenSwiper";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../global";
import TokenCounter from "./TokenCounter";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { addToken, loginPlayer } from "../../players/actions";


const TokenController = () => {
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.tokens.selectedToken);
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();


    const showToken = async () => {

        if (localStorage.access_token) {
            const response = await fetch(`${SEVER_PREFIX}/api/v1/show-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
                },
                body: JSON.stringify({token_id: SELECTED_TOKEN?.id})
            })

            const json = await response.json();

            if (response.ok) {
                dispatch(loginPlayer(json))
            }
        }
    }

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // justifyContent: "center",
                height: "100%",
            }}
        >


            <Box sx={{ width: "100%", p: 2, flex: 0. }}>
                <Card
                    sx={{
                        display: "flex",
                        p: 0.76,
                        margin: "0em 1em",
                        justifyContent: "space-between"
                    }}
                >
                    {LOGIN_PLAYER.tokens?.map((token, index) =>
                        <TokenCounter token={token} key={index} />
                    )}

                </Card>
            </Box>


            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 0.5
                }}
            >
                <Typography
                    variant="h4"
                    textTransform={"uppercase"}
                    sx={{
                        fontWeight: "bold"
                    }}
                >
                    {SELECTED_TOKEN?.name}
                </Typography>
            </Box>

            {/* Token list */}
            <TokenSwiper />


            {/* Button to add */}
            <Box
                sx={{
                    marginTop: "auto",
                    pb: 10,
                    width: "92%",
                }}
            >
                {SELECTED_TOKEN && <Button
                    variant="contained"
                    sx={{ width: "100%", pt: 2, pb: 2, }}
                    disabled={!Boolean(SELECTED_TOKEN)}
                    onClick={() => showToken()}
                >

                    <Typography>
                        Přidat
                    </Typography>
                </Button>}
            </Box>

        </Box>

    );
}

export default TokenController;