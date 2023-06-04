import { Box } from "@mui/material";

import Token from "./Token";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { GlobalState } from "../../global";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import { changeSelectedToken } from "../actions";

const TokenSwiper = () => {

    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.tokens.selectedToken);
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);

    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

    return (
        <Box
            sx={{
                width: "100%",
                height: 252
            }}
        >
            {
            TOKENS &&
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
                            <Token img={token.img} width={250}/>
                        </SwiperSlide>

                    )}
                </Swiper>
            }

        </Box>
    );
}

export default TokenSwiper;