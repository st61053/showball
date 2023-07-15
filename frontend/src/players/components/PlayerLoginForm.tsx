import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { IKeyImage, IMAGES_RESOURCES } from "../../tokens/constants";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { loginPlayer } from "../actions";
import { GlobalState } from "../../global";
import { Navigate } from "react-router-dom";


const PlayerLoginForm = () => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const IS_LOGGED_IN = useSelector((state: GlobalState) => state.players.isLoggedIn);
    const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);

    const { logo } = IMAGES_RESOURCES;
    const [showPassword, setShowPassword] = React.useState(false);

    const [USER_NAME, setUserName] = React.useState("");
    const [PASSWORD, setPassword] = React.useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLogIn = async () => {
        // dispatch(loginPlayer(CUSTOM_PLAYER));

        getAccessToken();

        setUserName("");
        setPassword("");
    }


    const getAccessToken = async () => {
        const DETAILS: IKeyImage = {
            'username': USER_NAME,
            'password': PASSWORD,
            'grant_type': 'password'
        };

        const FORM_BODY = Object.keys(DETAILS).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(DETAILS[key])).join('&');

        const response = await fetch(`${SEVER_PREFIX}/api/v1/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: FORM_BODY
        })

        const json = await response.json();

        if (response.ok) {
            // setAccesToken(json.access_token)
            localStorage.setItem('access_token', JSON.stringify(json.access_token));
            getPlayer();
        }
    }

    const getPlayer = async () => {

        const response = await fetch(`${SEVER_PREFIX}/api/v1/player`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
            }
        })

        const json = await response.json();

        if (response.ok) {
            dispatch(loginPlayer(json))
        } else {
            localStorage.removeItem('access_token');
        }
    }

    useEffect(() => {
        if(localStorage.access_token) {
            getPlayer();
        }
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                width: "min(100%, 400px)",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#ffffff"
            }}
        >
            {IS_LOGGED_IN && (
                <Navigate to="/" replace={true} />
            )}
            <Grid container >
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: "100%",
                            padding: "3em 0",
                            gap: 4,
                        }}
                    >

                        <img src={logo} alt={logo} width={"60%"} height={"60%"}></img>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "83%",
                                p: 2,
                                gap: 1.5
                            }}
                        >

                            <TextField sx={{ width: '100%' }} id="outlined-basic" label="Jméno" variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setUserName(event.target.value)
                                }
                                }
                            />

                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Heslo</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setPassword(event.target.value)
                                    }
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Heslo"
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                sx={{ width: "100%", p: 2 }}
                                onClick={handleLogIn}
                            >

                                <Typography>
                                    Přihlásit
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default PlayerLoginForm;