import { Box } from "@mui/material";

import Token from "./Token";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { GlobalState } from "../../global";

// Import Swiper React components
import { Swiper as Swip, SwiperSlide } from "swiper/react";
import { Swiper } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import { changeSelectedToken } from "../actions";
import { useEffect, useState } from "react";
import { canSpin } from "../../players/actions";

const TokenSwiper = () => {
    
    const SELECTED_TOKEN = useSelector((state: GlobalState) => state.tokens.selectedToken);
    const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);
    const [swiperRef, setSwiperRef] = useState<Swiper>();

    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();


    const swipe = (slide: Swiper) => {
        if (TOKENS) {
            dispatch(changeSelectedToken(TOKENS[slide.activeIndex]))
        }
    }

    useEffect(() => {
        swiperRef?.slideTo(TOKENS?.findIndex((token) => token.textId === SELECTED_TOKEN?.textId) ?? 0, 0);
    }, [TOKENS, SELECTED_TOKEN, swiperRef])

    return (
        <Box
            sx={{
                width: "100%",
                height: 252
            }}
        >
            {
                TOKENS &&
                <Swip
                    onSwiper={setSwiperRef}
                    initialSlide={TOKENS?.findIndex((token) => token.textId === SELECTED_TOKEN?.textId) || 0}
                    navigation={true}
                    modules={[Navigation]}
                    slidesPerView={1}
                    centeredSlides
                    onSlideChange={(slide) => swipe(slide)}
                >
                    {TOKENS.map((token, index) =>
                        <SwiperSlide
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                                <Token token={token} width={250} />
                        </SwiperSlide>

                    )}
                </Swip>
            }

        </Box>
    );
}

export default TokenSwiper;