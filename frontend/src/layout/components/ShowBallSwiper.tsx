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
import { canSpin } from "../../players/actions";
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

    const swipe = (slide: Swiper) => {
        if (slide.activeIndex === 4) {
            getPlayerSpin();
        }
    }

    return (
            <Swip
                pagination
                modules={[Pagination]}
                // className="mySwiper"
                initialSlide={1}
                onSlideChange={(slide) => swipe(slide)}
            >
                <SwiperSlide><Leaderboard /></SwiperSlide>
                <SwiperSlide><Profile /></SwiperSlide>
                <SwiperSlide><TokenController /></SwiperSlide>
                <SwiperSlide><Store /></SwiperSlide>
                <SwiperSlide><CustomWheel /></SwiperSlide>
            </Swip>

    );
}

export default ShowBallSwiper;