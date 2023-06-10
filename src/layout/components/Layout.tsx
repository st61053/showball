// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

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
import Stats from "../../players/components/Stats";

const Layout = () => {
    return (
        <Swiper
            pagination
            modules={[Pagination]}
            // className="mySwiper"
            initialSlide={1}
        >
            <SwiperSlide><Leaderboard /></SwiperSlide>
            <SwiperSlide><Stats /></SwiperSlide>
            <SwiperSlide><TokenController /></SwiperSlide>
            <SwiperSlide><Store /></SwiperSlide>
        </Swiper>
    );
}

export default Layout;