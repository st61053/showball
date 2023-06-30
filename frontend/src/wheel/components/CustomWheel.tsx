import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { IMAGES_RESOURCES, WHEEL_PRIZES } from '../../tokens/constants';
import StatItem from '../../players/components/StatItem';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { addCoin, canSpin, loginPlayer } from '../../players/actions';
import { GlobalState } from '../../global';
import Token from '../../tokens/components/Token';
import { IPlayerToken } from '../../players/types';

const CustomWheel = () => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);
    const CAN_SPIN = useSelector((state: GlobalState) => state.players.spin);
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);

    const [FREE_UPGRADE_TOKEN_ID, setFreeUpgradeTokenId] = useState<string>("");

    const WHEEL_COST = 3;

    const getFreeUpdateToken = () => {
        let min = 10;

        LOGIN_PLAYER.tokens.forEach((token) => {
            if (token.upgrade < min) {
                min = token.upgrade
            }
        })

        const POSIBLE_WIN_TOKENS = LOGIN_PLAYER.tokens.filter((token) => token.upgrade === min);

        setFreeUpgradeTokenId(POSIBLE_WIN_TOKENS[Math.floor(Math.random() * ((POSIBLE_WIN_TOKENS.length - 1) - 0)) + 0].tokenId);
    }

    const getPlayerSpin = async () => {

        if (localStorage.access_token) {
            const response = await fetch(`${SEVER_PREFIX}/api/v1/can-spin`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
                },
            })

            const json = await response.json();

            if (response.ok) {
                dispatch(canSpin(json.free_spin))
            }
        }
    }

    const wheelSpin = async () => {

        await getFreeUpdateToken();

        if (FREE_UPGRADE_TOKEN_ID === "") {
            if (localStorage.access_token) {
                const response = await fetch(`${SEVER_PREFIX}/api/v1/wheel-spin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
                    },
                    body: JSON.stringify({ prize: WIN_LIST[data[prizeNumber].option], free: CAN_SPIN })
                })
    
                const json = await response.json();
    
                if (response.ok) {
                    await getPlayerSpin();
                    dispatch(loginPlayer(json))
                }
            }
        } else {
            if (localStorage.access_token) {
                const response = await fetch(`${SEVER_PREFIX}/api/v1/wheel-spin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
                    },
                    body: JSON.stringify({ prize: WIN_LIST[data[prizeNumber].option], free: CAN_SPIN })
                })
    
                const json = await response.json();
    
                if (response.ok) {
                    await getPlayerSpin();
                    dispatch(loginPlayer(json))
                }
            }
        }

    }


    const { coin } = IMAGES_RESOURCES;

    const { low, medium, hight, huge, secret } = WHEEL_PRIZES;

    const data = [
        { option: 'medium', image: { uri: medium, offsetX: 0, offsetY: 200, sizeMultiplier: 0.6 }, style: { backgroundColor: "#9c27b0", textColor: 'black' } },
        { option: 'low', image: { uri: low, offsetX: 0, offsetY: 200, sizeMultiplier: 0.6 }, style: { backgroundColor: "#1976d2", textColor: 'black' } },
        { option: 'hight', image: { uri: hight, offsetX: 0, offsetY: 200, sizeMultiplier: 0.6 }, style: { backgroundColor: "#2e7d32", textColor: 'black' } },
        { option: 'huge', image: { uri: huge, offsetX: 0, offsetY: 200, sizeMultiplier: 0.8 }, style: { backgroundColor: "#ff9800", textColor: 'black' } },
        { option: 'medium', image: { uri: medium, offsetX: 0, offsetY: 200, sizeMultiplier: 0.6 }, style: { backgroundColor: "#9c27b0", textColor: 'black' } },
        { option: 'low', image: { uri: low, offsetX: 0, offsetY: 200, sizeMultiplier: 0.6 }, style: { backgroundColor: "#1976d2", textColor: 'black' } },
        { option: 'hight', image: { uri: hight, offsetX: 0, offsetY: 200, sizeMultiplier: 0.6 }, style: { backgroundColor: "#2e7d32", textColor: 'black' } },
        { option: 'low', image: { uri: low, offsetX: 0, offsetY: 200, sizeMultiplier: 0.6 }, style: { backgroundColor: "#1976d2", textColor: 'black' } },
        { option: 'medium', image: { uri: medium, offsetX: 0, offsetY: 200, sizeMultiplier: 0.6 }, style: { backgroundColor: "#9c27b0", textColor: 'black' } },
        { option: 'secret', image: { uri: secret, offsetX: 0, offsetY: 200, sizeMultiplier: 0.6 }, style: { backgroundColor: "#d32f2f", textColor: 'black' } },
        { option: 'low', image: { uri: low, offsetX: 0, offsetY: 200, sizeMultiplier: 0.6 }, style: { backgroundColor: "#1976d2", textColor: 'black' } },


    ]

    type IWin = {
        [key: string]: number
    }

    const WIN_LIST: IWin = {
        low: 1,
        medium: 3,
        hight: 5,
        huge: 10,
        secret: 100
    }

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [spin, setSpin] = useState(false);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
            setSpin(false);
            dispatch(addCoin(-WHEEL_COST));
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
            <Box
                sx={{
                    pt: 8
                }}
            >
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    spinDuration={0.4}
                    onStopSpinning={() => {
                        setMustSpin(false);
                        setSpin(true);
                        // dispatch(addCoin(WIN_LIST[data[prizeNumber].option]))
                        wheelSpin();
                    }}
                    pointerProps={{}}
                />
            </Box>

            {spin && <Typography
                variant="h5"
                sx={{
                    pt: 4,
                    pb: 1,
                    fontWeight: "bold"
                }}
            >
                Vyhrál jsi:
            </Typography>}

            {spin && data[prizeNumber].option !== "secret" && <StatItem count={WIN_LIST[data[prizeNumber].option]} img={coin} />}

            {spin && data[prizeNumber].option === "secret" &&

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1.5
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: "bold"
                        }}
                    >
                        Free upgrade na
                    </Typography>

                    {
                        TOKENS && FREE_UPGRADE_TOKEN_ID !== "" &&
                        <Token token={TOKENS?.find((tok) => tok.id === FREE_UPGRADE_TOKEN_ID) || TOKENS[0]} width={50} />
                    }


                </Box>


            }

            <Box
                sx={{
                    marginTop: "auto",
                    pb: 12,
                    width: "92%",
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: "100%",
                        pt: 2,
                        pb: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1
                    }}
                    onClick={handleSpinClick}
                    disabled={Boolean(LOGIN_PLAYER.stats.coins < WHEEL_COST && !CAN_SPIN)}
                >

                    <Typography>
                        Roztočit!
                    </Typography>
                    {!CAN_SPIN && <Typography>{`(`}</Typography>}
                    {!CAN_SPIN && <StatItem count={3} img={coin} />}
                    {!CAN_SPIN && <Typography>{`)`}</Typography>}
                </Button>
            </Box>
        </Box>
    );
}

export default CustomWheel;