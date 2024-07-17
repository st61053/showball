import { Box, Typography } from '@mui/material'
import React from 'react'
import { IMenuItem } from './Menu'

const MenuItem = ({ icon, name, active, open, setActive }: IMenuItem) => {

    const isActive = active?.toLowerCase() === name.toLowerCase()

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2.6,
                p: 1.4,
                pl: 1.9,
                backgroundColor: isActive ? "#1E63BE" : "transparent",
                borderRadius: "0.5em",
                cursor: "pointer"
            }}
            onClick={() => setActive && setActive(name)}
        >
            {icon}
            {open && <Typography
                variant='body1'
                sx={{
                    color: "white",
                    fontWeight: "bold"
                }}
            >
                {name}
            </Typography>}
        </Box>
    )
}

export default MenuItem