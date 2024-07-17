// Import Swiper React components
import { Swiper as Swip, SwiperSlide } from "swiper/react";
import { Swiper } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Layout.css";

// import required modules
import { Pagination } from "swiper";
import Leaderboard from "../../Leaderboard/components/Leaderboard";
import TokenController from "../../tokens/components/TokenController";
import Store from "../../store/components/Store";
import Profile from "../../players/components/Profile";
import CustomWheel from "../../wheel/components/CustomWheel";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { GlobalState } from "../../global";
import { canSpin, initPlayers, loginPlayer } from "../../players/actions";
import ProfileV2 from "../../players/components/ProfileV2";
import { Box } from "@mui/material";
const ShowBallSwiper = () => {

    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);

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

    const getPlayers = async () => {

        if (localStorage.access_token) {
            const response = await fetch(`${SEVER_PREFIX}/api/v1/players`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.access_token)}`
                },
            })

            const json = await response.json();

            if (response.ok) {
                dispatch(initPlayers(json))
            }
        }
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

    const swipe = (slide: Swiper) => {
        if(localStorage.access_token) {
            getPlayer();
        }
        getPlayers();
    }

    return (
        <Box
            sx={{
                width: "min(100%, 400px)",
                height: "min(100%, 900px)"
            }}
        >
            <Swip
                pagination
                modules={[Pagination]}
                // className="mySwiper"
                initialSlide={1}
                onSlideChange={(slide) => swipe(slide)}
            >
                <SwiperSlide><Leaderboard /></SwiperSlide>
                <SwiperSlide><ProfileV2 /></SwiperSlide>
                <SwiperSlide><TokenController /></SwiperSlide>
                <SwiperSlide><Store /></SwiperSlide>
                <SwiperSlide><CustomWheel /></SwiperSlide>
            </Swip>
        </Box>
    );
}

export default ShowBallSwiper;