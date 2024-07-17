import { Box } from '@mui/material'
import React, { ReactNode, useState } from 'react'

import './Menu.css';
import Home from './Home';
import { BlurCircular, PeopleAltOutlined, StackedLineChart } from '@mui/icons-material';
import MenuItem from './MenuItem';

export interface IMenuItem {
  name: string;
  icon: ReactNode;
  open?: boolean;
  active?: string;
  setActive?: (name: string) => void,
}

const Menu = () => {

  const [active, setActive] = useState<string>("Statistics");
  const [open, setOpen] = useState<boolean>(true);

  const menuItems: IMenuItem[] = [
    {
      name: "Statistics",
      icon: <StackedLineChart
        sx={{
          color: "white",
          height: 36,
          width: 36
        }} />,
    },
    {
      name: "Tokens",
      icon: <BlurCircular
        sx={{
          color: "white",
          height: 36,
          width: 36
        }} />,
    },
    {
      name: "Players",
      icon: <PeopleAltOutlined
        sx={{
          color: "white",
          height: 36,
          width: 36
        }} />,
    }
  ]



  return (
    <Box
      className={"menu-container"}
      sx={{
        display: "flex",
        width: open ? "250px" : "64px",
        borderRadius: "0.5em",
        flexDirection: "column",
        p: 2,
        transition: "width 0.15s ease-out"
      }}
    >
      <Home
        setOpen={() => setOpen((prev) => !prev)}
        open={open}
      />
      {menuItems.map((item, i) =>
        <MenuItem
          key={i}
          icon={item.icon}
          name={item.name}
          active={active}
          open={open}
          setActive={(name: string) => setActive(name)}
        />
      )}
    </Box>
  )
}

export default Menu