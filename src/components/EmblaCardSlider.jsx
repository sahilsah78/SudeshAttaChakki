import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";
export function EmblaCardSlider({
  className: extraClassName,
  children: cardArr,
  cardTransitionDuration = "300ms",
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const slideContainer = useRef(null);
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", selectCb);
    // emblaApi.on("scroll", scrollCb);
    const slides = emblaApi.slideNodes();

   /*  function scrollCb() {
      const current = emblaApi.selectedScrollSnap();
      const scrollProgress = emblaApi.scrollProgress();
      //   --
      const currentTranslate = scrollProgress * 100;
      console.log(currentTranslate);
      slides.forEach((slide, index) => {
        const distance = index - current;
        if (distance === current) {
          applyStyles({
            el: slide,
            style: {
              zIndex: 100,
            },
          });
          return;
        }
        applyStyles({
          el: slide,
          style: {
            transform: `translateX(calc(${-distance} * 80%))`,
          },
          // --
        });
      });

      function applyStyles({ el, style }) {
        for (const [key, value] of Object.entries(style)) {
          el.style[key] = value;
        }
      }
    } */

    function selectCb() {
      const current = emblaApi.selectedScrollSnap();
      console.log("fired");
      //   --
      slides.forEach((slide, index) => {
        const distance = index - current;

        if (distance === 0) {
          applyStyles({
            el: slide,
            style: {
              transform: "unset",
              zIndex: 100,
              boxShadow: "0 6px 14px #00000021",
            },
          });
        } else if (distance === -1 || distance === 1) {
          applyStyles({
            el: slide,
            style: {
              transform: `rotate(calc(${distance} * 6deg)) translate(calc(${-distance} * 75%),6%) scale(0.88)`,
              zIndex: Math.abs(distance),
              boxShadow: "0 6px 10px #00000021",
            },
          });
        }
      });

      function applyStyles({ el, style }) {
        for (const [key, value] of Object.entries(style)) {
          el.style[key] = value;
        }
      }

      /*   function applyStyles({ el, type, distance }) {
          const sign = Math.sign(distance);
          const absolute = Math.abs(distance);
          const isSibling = distance === -1 || distance === 1;
          let translateX = isSibling ? -sign * 75 : -distance * 85; //more work needs to be done one this.
          let translateY = isSibling ? 6 : absolute * 6.5;
          let rotate = isSibling ? sign * 6 : (distance / 10 + 6) * sign;

          // --
          const style = {
            active: {
              transform: "unset",
              position: "relative",
              zIndex: 100,
              left: "unset",
              right: "unset",
              boxShadow: "0 6px 14px #00000021",
            },

            disable: {
              transform: `rotate(${rotate}deg) translate(${translateX}%,${translateY}%) scale(0.88)`,
              position: "relative",
              zIndex: -absolute,
              left: "unset",
              right: 0,
              boxShadow: "0 4px 10px #00000021",
            },
          };
          // --set styles
          for (const [key, value] of Object.entries(style[type])) {
            el.style[key] = value;
          }
        } */
    }
  }, [emblaApi]);

  return (
    <div id="embla" className={extraClassName}>
      <div id="embla__viewport" className="" ref={emblaRef}>
        <div
          ref={slideContainer}
          style={{ "--card-duration": cardTransitionDuration }}
          id="embla__container"
          className="relative flex touch-pan-y touch-pinch-zoom *:min-w-0 *:shrink-0 *:grow-0 *:duration-(--card-duration) *:select-none"
        >
          {cardArr}
        </div>
      </div>

      {/* <button id="embla__prev">prev</button> */}
      {/* <button id="embla__next">next</button> */}
    </div>
  );
}

//!think about adding pinch zoom in `customSlider`
//!*:shrink-0 *:grow-0 *:basis-full *:min-w-0 -->consider adding them into custom slider slide as well.
