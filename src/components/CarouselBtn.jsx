import { SpriteIcon } from "./SpriteIcon";

export function CarouselBtn({
  slider,
  startAutoPlay,
  stopAutoPlay,
  isLoop = false,
  slideIndexCount,
  isAutoPlayEnabled,
  onClick,
  pointingDirection,
  isLightBox,
  disableLightBoxBtn,
}) {
  const mouseEvents = {
    onMouseEnter: () => {
      if (isAutoPlayEnabled) stopAutoPlay();
      if (isLightBox) disableLightBoxBtn(true);
      slider.current.isCarouselBtnActive = true;
    },
    onMouseLeave: () => {
      if (isAutoPlayEnabled) startAutoPlay();
      slider.current.isCarouselBtnActive = false;
      if (isLightBox) disableLightBoxBtn(false);
    },
  };

  function isDisabled(pointingDirection) {
    if (pointingDirection === "left") {
      if (slideIndexCount === 0) return true;
    } else if (slideIndexCount === slider.current.totalSlideCount - 1) {
      return true;
    }
    return false;
  }

  return (
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onPointerMove={(e) => e.stopPropagation()}
      disabled={!isLoop && isDisabled(pointingDirection)}
      onClick={onClick}
      {...mouseEvents}
      className="font-open-sans cursor-pointer rounded-full bg-white p-4 text-4xl font-extrabold active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-80"
    >
      <SpriteIcon
        className={`size-5 ${pointingDirection === "left" ? "rotate-180" : ""}`}
        iconName="chevron-arrow-right"
      />
    </button>
  );
}
