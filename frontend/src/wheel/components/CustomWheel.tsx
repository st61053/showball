import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { IMAGES_RESOURCES, WHEEL_PRIZES } from '../../tokens/constants';
import StatItem from '../../players/components/StatItem';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { addCoin } from '../../players/actions';

const CustomWheel = () => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
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

    const WIN_LIST : IWin = {
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
                        dispatch(addCoin(WIN_LIST[data[prizeNumber].option]))
                    }}
                    pointerProps={{}}
                />
            </Box>
            {/* <Snackbar open={spin} autoHideDuration={6000} onClose={() => setSpin(false)}
                TransitionComponent={Slide}
            >
                <Alert onClose={() => setSpin(false)} severity="success" sx={{ width: '100%' }} variant="outlined">
                    Vyhrál si cenu číslo: {prizeNumber}
                </Alert>

            </Snackbar> */}

            {spin && <Typography
                variant="h5"
                // textTransform={"uppercase"}
                sx={{
                    pt: 4,
                    pb: 1,
                    fontWeight: "bold"
                }}
            >
                Vyhrál jsi:
            </Typography>}

            {spin && <StatItem count={WIN_LIST[data[prizeNumber].option]} img={coin} />}

            <Box
                sx={{
                    marginTop: "auto",
                    pb: 12,
                    width: "92%",
                }}
            >
                <Button
                    variant="contained"
                    sx={{ width: "100%", pt: 2, pb: 2, }}
                    onClick={handleSpinClick}
                >

                    <Typography>
                        Roztočit
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}

export default CustomWheel;