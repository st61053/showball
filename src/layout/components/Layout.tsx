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

const Layout = () => {
    return (
        <Swiper
            pagination
            modules={[Pagination]}
            // className="mySwiper"
            initialSlide={1}
        >
            <SwiperSlide><Leaderboard /></SwiperSlide>
            <SwiperSlide>Home</SwiperSlide>
            <SwiperSlide><TokenController /></SwiperSlide>
        </Swiper>
    );
}

export default Layout;