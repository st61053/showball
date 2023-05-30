import { Box } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Token from "./Token";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { GlobalState } from "../../global";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import { changeSelectedToken } from "../actions";
import { TOKENS } from "../constants";

const TokenSwiper = () => {

    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.tokens.selectedToken);
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

    return (
        <Box
            sx={{
                width: "100%",
                height: 252
            }}
        >
            <Swiper
                initialSlide={SELECTED_TOKEN?.id || 0}
                navigation={true}
                modules={[Navigation]}
                slidesPerView={1}
                centeredSlides
                onSlideChange={(slide) => dispatch(changeSelectedToken(TOKENS[slide.activeIndex]))}
            >
                {TOKENS.map((token, index) =>
                    <SwiperSlide
                        key={index}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Token />

                    </SwiperSlide>

                )}
            </Swiper>
        </Box>
    );
}

export default TokenSwiper;