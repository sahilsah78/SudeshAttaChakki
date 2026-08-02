//my stuff
import { useRef } from "react";
import { CardPagination } from "./CardPagination";
//swiper react components
import { Swiper, SwiperSlide } from "swiper/react";
//swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
//required module
import { EffectCards } from "swiper/modules";

export function SwiperCardEffect({
  className: extraClassName,
  cardWidth,
  cardRadius,
  initialCardIndex,
  children: cardArr,
  cardTransitionDuration = "300ms",
}) {
  const PaginationCurrentTextEl = useRef(null);

  //  --
  return (
    <div className={extraClassName}>
      <Swiper
        // onProgress={(swiper) => {
        //   const targetSlide = swiper.slides[swiper.realIndex];
        //   console.log(targetSlide.progress);
        // }}
        
        onSlideChange={(swiper) => {
          if (!PaginationCurrentTextEl.current) return;
          const currentCard = swiper.realIndex + 1;
          PaginationCurrentTextEl.current.textContent = currentCard;
        }}
        initialSlide={initialCardIndex}
        effect="cards"
        cardsEffect={{
          perSlideOffset: 3, //10on tab less as much as possible find a way
          perSlideRotate: 6,
          rotate: true,
          slideShadows: true,
        }}
        grabCursor={true}
        modules={[EffectCards]}
        style={{ "--card-radius": cardRadius, "--card-width": cardWidth }}
        id="swiperCardEffect"
      >
        {cardArr.map((card, i) => (
          <SwiperSlide key={i}>{card}</SwiperSlide>
        ))}
      </Swiper>
      <CardPagination
        initialCardIndex={initialCardIndex}
        PaginationCurrentTextEl={PaginationCurrentTextEl}
        totalCards={cardArr.length}
      />
    </div>
  );
}
