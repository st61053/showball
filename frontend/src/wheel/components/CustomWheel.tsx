import { Box, Button, Card, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { IMAGES_RESOURCES, WHEEL_PRIZES } from '../../tokens/constants';
import StatItem from '../../players/components/StatItem';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { addCoin, canSpin, loginPlayer } from '../../players/actions';
import { GlobalState } from '../../global';
import Token from '../../tokens/components/Token';
import Coin from '../../store/components/Coin';

const CustomWheel = () => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);
    const CAN_SPIN = useSelector((state: GlobalState) => state.players.loginPlayer.stats.free_spin);
    const LOGIN_PLAYER = useSelector((state: GlobalState) => state.players.loginPlayer);
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);


    useEffect(() => {console.log(LOGIN_PLAYER?.stats.coins)}, [LOGIN_PLAYER])


    const [FREE_UPGRADE_TOKEN_ID, setFreeUpgradeTokenId] = useState<string>("");
    const [RULLETE_RERENDER, setRulleteRerender] = useState(true);
    const [LAST_WIN, setLastWin] = useState(0);

    const WHEEL_COST = 5;

    const getFreeUpdateToken = () => {
        // let min = 9999;

        // LOGIN_PLAYER.tokens.forEach((token) => {
        //     if (token.level < min) {
        //         min = token.level
        //     }
        // })

        const playerTokens = TOKENS.map((t) => {
            const playerToken = LOGIN_PLAYER.tokens.find((ts) => ts.textId === t.textId);

            return playerToken || {textId:t, level:1, count:0};

            // if(!playerToken) {
            //     return {textId:t, level:1, count:0}
            // }

            // return playerToken;
        })

        const min = Math.min(...playerTokens.map((t) => t.level))
        const POSSIBLE_WIN_TOKENS = LOGIN_PLAYER.tokens.filter((token) => token.level === min);
        return POSSIBLE_WIN_TOKENS[Math.floor(Math.random() * ((POSSIBLE_WIN_TOKENS.length - 1) - 0)) + 0].textId;

        // const missingToken = TOKENS.filter((t) => LOGIN_PLAYER.tokens.find((ts) => ts.textId === t.textId))

        // if(missingToken.length > 0) {
        //     const POSSIBLE_WIN_TOKENS = missingToken
        //     return POSSIBLE_WIN_TOKENS[Math.floor(Math.random() * ((POSSIBLE_WIN_TOKENS.length - 1) - 0)) + 0].textId;
        // } else {
        //     const min = Math.min(...LOGIN_PLAYER.tokens.map((ts) => ts.level))
        //     const POSSIBLE_WIN_TOKENS = LOGIN_PLAYER.tokens.filter((token) => token.level === min);
        //     return POSSIBLE_WIN_TOKENS[Math.floor(Math.random() * ((POSSIBLE_WIN_TOKENS.length - 1) - 0)) + 0].textId;
        // }
        // setFreeUpgradeTokenId(POSIBLE_WIN_TOKENS[Math.floor(Math.random() * ((POSIBLE_WIN_TOKENS.length - 1) - 0)) + 0].tokenId);
        //return POSSIBLE_WIN_TOKENS[Math.floor(Math.random() * ((POSSIBLE_WIN_TOKENS.length - 1) - 0)) + 0].textId;
    }

    const getPlayer = async () => {

        const response = await fetch(`${SEVER_PREFIX}/api/v1/profile`, {
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

    const wheelSpin = async () => {
        setRulleteRerender(false);

        if (localStorage.access_token) {
            await fetch(`${SEVER_PREFIX}/api/v1/profile/spin-wheel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
                },
                body: JSON.stringify({ prize: WIN_LIST[data[prizeNumber].option] })
            })
                .then(response => response.json())
                .then(async json => {
                    if (data[prizeNumber].option === 'secret') {

                        const tokenId = getFreeUpdateToken();
                        console.log(tokenId)
                        await fetch(`${SEVER_PREFIX}/api/v1/profile/upgrade-token/${tokenId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
                            },
                            body: JSON.stringify({ free: true })
                        })
                            .then(response => response.json())
                            .then(async js => {
                                setFreeUpgradeTokenId(tokenId);
                                await getPlayer();
                                dispatch(loginPlayer(js));
                            })
                    } else {
                        // await getPlayer();
                        dispatch(loginPlayer(json));
                    }

                })
                .then(() => {
                    setRulleteRerender(true);
                    setMustSpin(false);
                })
                .catch(error => {
                    wheelSpin();
                });
        }
    }

    const { coin, pointer } = IMAGES_RESOURCES;

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
        secret: 0
    }

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [spin, setSpin] = useState(false);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setFreeUpgradeTokenId("");
            setMustSpin(true);
            setSpin(false);
            if (!CAN_SPIN) {
                dispatch(addCoin(-WHEEL_COST));
            }
            // setShow(false);
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
                pt: 2
            }}
        >
            <Card
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "93%",
                    padding: "1.15em 0",
                    gap: 2
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: "bold",
                        ml: 1.5
                    }}
                >
                    {`Kolo štěstí`}
                </Typography>
                <Box
                    sx={{ marginLeft: "auto", mr: 1.5 }}
                >
                    <Coin count={LOGIN_PLAYER?.stats.coins || 0} />
                </Box>

            </Card>

            <Box
                sx={{
                    pt: 4,
                    width: "93%",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                {LOGIN_PLAYER &&
                    <Wheel
                        
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        spinDuration={0.4}
                        onStopSpinning={async () => {
                            setSpin(true);
                            setLastWin(prizeNumber);
                            wheelSpin();
                            // dispatch(addCoin(WIN_LIST[data[prizeNumber].option]))
                        }}
                        pointerProps={{ src: pointer }}
                        startingOptionIndex={LAST_WIN}


                    />}
            </Box>

            {spin && RULLETE_RERENDER && <Typography
                variant="h5"
                sx={{
                    pt: 2,
                    pb: 1,
                    fontWeight: "bold"
                }}
            >
                Vyhrál jsi:
            </Typography>}

            {spin && RULLETE_RERENDER && data[prizeNumber].option !== "secret" && <StatItem count={WIN_LIST[data[prizeNumber].option]} img={coin} />}

            {spin && RULLETE_RERENDER && data[prizeNumber].option === "secret" &&

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
                        Vylepšení zdarma na
                    </Typography>

                    {
                        TOKENS && FREE_UPGRADE_TOKEN_ID !== "" && RULLETE_RERENDER &&
                        <Token token={TOKENS?.find((tok) => tok.textId === FREE_UPGRADE_TOKEN_ID) || TOKENS[0]} width={50} />
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
                    disabled={Boolean(LOGIN_PLAYER.stats.coins < WHEEL_COST && !CAN_SPIN) || !RULLETE_RERENDER}
                >

                    <Typography>
                        Roztočit!
                    </Typography>
                    {!CAN_SPIN && <Typography>{`(`}</Typography>}
                    {!CAN_SPIN && <StatItem count={WHEEL_COST} img={coin} />}
                    {!CAN_SPIN && <Typography>{`)`}</Typography>}
                </Button>
            </Box>
        </Box>
    );
}

export default CustomWheel;