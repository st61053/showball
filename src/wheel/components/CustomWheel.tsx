import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { IMAGES_RESOURCES, TOKENS } from '../../tokens/constants';
import StatItem from '../../players/components/StatItem';

const CustomWheel = () => {

    const { logo } = IMAGES_RESOURCES;

    const data = [
        { option: '100', style: { backgroundColor: "#1976d2", textColor: 'white' } },
        { option: '1', image: { uri: TOKENS[1].img, offsetX: 0, offsetY: 150, sizeMultiplier: 0.5 }, style: { backgroundColor: "#FFFFFF", textColor: 'black' } },
        { option: '200', style: { backgroundColor: "#1976d2", textColor: 'white' } },
        { option: '3', image: { uri: TOKENS[3].img, offsetX: 0, offsetY: 150, sizeMultiplier: 0.5 }, style: { backgroundColor: "#FFFFFF", textColor: 'black' } },
        { option: '300', style: { backgroundColor: "#1976d2", textColor: 'white' } },
        { option: '5', image: { uri: TOKENS[5].img, offsetX: 0, offsetY: 150, sizeMultiplier: 0.5 }, style: { backgroundColor: "#FFFFFF", textColor: 'black' } },
        { option: '400', style: { backgroundColor: "#1976d2", textColor: 'white' } },
        { option: '7', image: { uri: TOKENS[7].img, offsetX: 0, offsetY: 150, sizeMultiplier: 0.5 }, style: { backgroundColor: "#FFFFFF", textColor: 'black' } },
        { option: '500', style: { backgroundColor: "#1976d2", textColor: 'white' } },
        { option: '9', image: { uri: TOKENS[9].img, offsetX: 0, offsetY: 150, sizeMultiplier: 0.5 }, style: { backgroundColor: "#FFFFFF", textColor: 'black' } },
        { option: '600', style: { backgroundColor: "#1976d2", textColor: 'white' } },
        { option: '11', image: { uri: logo, offsetX: 0, offsetY: 150, sizeMultiplier: 0.5 }, style: { backgroundColor: "#FFFFFF", textColor: 'black' } },
    ]

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

            {spin && <StatItem count={20} img={logo} />}

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