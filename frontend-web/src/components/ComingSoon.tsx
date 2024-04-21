import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import logo from "../assets/img/showball-logo.png"
import { motion } from "framer-motion";

const ComingSoon = () => {
    const showball = "SHOWBALL"

    const [end, setEnd] = useState(false);
    const theme = useTheme();
  
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', "lg"));
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  
    useEffect(() => {
      if(end) {
        console.log("fff");
        setEnd(false);
      }
    }, [end])
  
    return (
      <Box sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <motion.div
          style={{
            height: "25%",
            width: "25%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
  
          animate={{
            x: ["-100%", "300%", "74%"],
            rotate: [0, 360 * 3, 360],
          }}
          transition={{
            duration: 6,
            ease: "backInOut",
            times: [0, 0.6, 1],
            // delay: 1
            // repeat: Infinity,
            // repeatDelay: 4,
          }}
          
        >
          <img
            width={isXs ? "70%" : "100%"}
            height={isXs ? "70%" : "100%"}
            style={{
              objectFit: 'contain',
            }}
            src={logo}
            alt={"showball"}
          ></img>
        </motion.div>
  
        <Box
          style={{
            width: "100%",
            position: "absolute",
            margin: "auto",
            display: "flex",
            left: "7%",
            alignContent: "center",
            justifyContent: "center",
            zIndex: -1
          }}
        >
          {[...showball].map((el, i) => (
            <motion.span
              initial={{ visibility: "hidden"}}
              animate={{ visibility: "visible" }}
              transition={{
                duration: 0.25,
                delay: 1.80 + (i / 13),
              }}
              key={i}
            >
              <Typography
                variant={isXs ? "h6" : isSm ? "h3" : isMd ? "h2" : isLg ? "h1" : "body1"}
                sx={{
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                {el}
              </Typography>
            </motion.span>
          ))}
        </Box>
        <Box
          style={{
            width: "100%",
            position: "absolute",
            margin: "auto",
            display: "flex",
            gap: isXs ? "0.2em" : "0.5em",
            top: isXs ? "51%" : "55%",
            left: "7%",
            alignContent: "center",
            justifyContent: "center",
            zIndex: -1
          }}
        >
          {["Coming"," soon!"].map((el, i) => (
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{
                duration: 1,
                delay: 6 + (i / 2),
              }}
            >
              <Typography
                variant={isXs ? "caption" : isSm ? "body2" : isMd ? "h5" : isLg ? "h4" : "body1"}
                sx={{
                  color: theme.palette.grey[400],
                  fontWeight: "bold"
                }}
              >
                {`${el}`}
              </Typography>
            </motion.div>
          ))}
        </Box>
      </Box>
)}

export default ComingSoon