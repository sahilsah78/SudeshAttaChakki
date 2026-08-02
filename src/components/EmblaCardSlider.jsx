import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";
export function EmblaCardSlider({
  className: extraClassName,
  children: cardArr,
  cardTransitionDuration = "300ms",
  gapBetweenCards = "24px",
}) {
  //i have ditched it for card slide as is is just extra and the existign logic conflicts as well. so it is not good to use it.
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const emblaContainerEl = useRef(null);

  useEffect(() => {
    if (!emblaApi) return;
    // --
    emblaApi.on("pointerDown", () => {
      document.body.style.cursor = "grabbing";
    });
    emblaApi.on("pointerUp", () => {
      document.body.style.cursor = "unset";
    });
  }, [emblaApi]);
  return (
    <div id="embla" className={`${extraClassName} `}>
      <div id="embla__viewport" ref={emblaRef}>
        <div
          ref={emblaContainerEl}
          style={{
            "--card-duration": cardTransitionDuration,
            "--column-gap": gapBetweenCards,
          }}
          id="embla__container"
          className="relative flex cursor-grab touch-pan-y touch-pinch-zoom gap-x-(--column-gap) select-none *:min-w-0 *:shrink-0 *:grow-0 *:duration-(--card-duration) active:cursor-grabbing"
        >
          {cardArr.map((card) => (
            <div>{card}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
