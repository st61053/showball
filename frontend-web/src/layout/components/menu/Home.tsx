import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import logo from "../../../assets/showball-logo.png"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Home = ({ setOpen, open }: { setOpen: () => void, open: boolean }) => {

    const size = "64px"

    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                pb: 2
            }}
        >
            <img
                style={{
                    cursor: "pointer"
                }}
                src={logo}
                width={size}
                onClick={setOpen}
            >
            </img>
            {open && <Box
                sx={{
                    pt: 1,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1
                }}
            >
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Typography
                        variant='h6'
                        lineHeight={1.2}
                        sx={{
                            color: "white",
                            fontWeight: "bold"
                        }}
                    >
                        {"SHOWBALL"}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={setOpen}
                    >
                        <KeyboardArrowLeftIcon sx={{ color: "white" }} />
                    </IconButton>
                </Box>
                <Typography
                    variant='caption'
                    sx={{
                        color: "#ECECEC",
                        position: "absolute",
                        top: 70
                    }}
                >
                    {"Play with balls!"}
                </Typography>
            </Box>}
        </Box>
    )
}

export default Home