import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { IMAGES_RESOURCES } from "../../tokens/constants";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { loginPlayer } from "../actions";
import { CUSTOM_PLAYER } from "../constants";
import { GlobalState } from "../../global";
import { Navigate } from "react-router-dom";


const PlayerLoginForm = () => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const IS_LOGGED_IN = useSelector((state: GlobalState) => state.players.isLoggedIn);

    const { logo } = IMAGES_RESOURCES;
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLogIn = () => {
        dispatch(loginPlayer(CUSTOM_PLAYER));

    }

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                width: "100%",
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

                            <TextField sx={{ width: '100%' }} id="outlined-basic" label="Jméno" variant="outlined" />

                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Heslo</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
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