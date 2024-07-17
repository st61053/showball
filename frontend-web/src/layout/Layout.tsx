import React, { ReactNode } from 'react'
import Menu from './components/menu/Menu';
import { Box } from '@mui/material';

interface ILayout {
    children?: ReactNode;
}

const Layout = ({ children }: ILayout) => {
    return (
        <Box
            sx={{
                display: "flex",
                p: "1em",
                height: "calc(100vh - 2em)"
            }}
        >
            <Menu />
            <Box
                sx={{
                    flex: 1,
                    pl: "1em",
                }}>
                {children}
            </Box>

        </Box>
    )
}

export default Layout