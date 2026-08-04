import { useEffect, useRef, useState } from "react";
import { OptimizedImg } from "./OptimizedImg";
import { HorizontalSliderNavigation } from "./HorizontalSliderNavigation";
import { VerticalSliderNavigation } from "./VerticalSliderNavigation";
import { SliderLightBoxPlugin } from "./SliderLightBoxPlugin";

export function CustomSlider({
  children = null,
  defineTransitionDuration,
  autoPlayDuration,
  imgNameArr,
  isAutoPlayEnabled = false,
  setAxis = "X",
  isTouchConstraint = false,
  isLoop = true,
  isCrouselBtnHidden = false,
  isLightBox = false,
  LightBoxBorderRadius = "",
}) {
  //!though not needed but jsut as final touch implement debounce for autoplay later
  //!later do a skeleton effect for the slider.and write a logic to mount it later.
  //! and media query to turn slider vertical and horizontal.
  //!rethink about wheater the slider image should be draggable or not. 
  // isAxisAutomatic = false, think about wheather you want to add this feature or not.
  //later work on passing desired crousel options, then we will ditch the horizontal and vertical naviagation and shift to micro components
  const axis = setAxis.toUpperCase();
  const isAxisX = axis === "X" ? true : false;

  const slider = useRef({
    trackLength: 0,
    isTransitioning: false,
    autoPlayId: 0,
    totalSlideCount: children?.length || imgNameArr.length,
    totalSlideIndexCount: children?.length - 1 || imgNameArr.length - 1,
    isCarouselBtnActive: false,
    baseTranslate: 0,
    reset: {
      start: false,
      action: null,
    },
  });

  const swipe = useRef({
    currentSwipe: 0,
    swipeTranslate: 0,
    isBeyondEnd: false,
  });
  const touch = useRef({
    focused: false,
    active: false,
    startPoint: 0,
    endPoint: 0,
  });

  const [slideIndexCount, setSlideIndexCount] = useState(0);
  const slideTrackEl = useRef(null);
  const slideEl = useRef(null);
  const slideContainerEl = useRef(null);
  const isEnd =
    slideIndexCount === 0 ||
    slideIndexCount === slider.current.totalSlideIndexCount;
  const lightBoxBtn = useRef(null);

  if (!isLoop && isAutoPlayEnabled) {
    throw new Error("Wrong prop Combination, To use autoplay set isLoop true");
  }

  useEffect(() => {
    if (!isAutoPlayEnabled) return;

    const observer = new IntersectionObserver(([entry]) => {
      //entry.isIntersecting is true when el is visible on view port
      if (entry.isIntersecting) startAutoPlay();
      else stopAutoPlay();
    });

    observer.observe(slideEl.current);
    //slideTrackEl works as well but to keep it simple i went for the track container as it has a stable size

    return () => observer.disconnect();
  }, [isAutoPlayEnabled]);

  useEffect(() => {
    // --for isAutoPlayEnabled toggle and default case
    if (!isAutoPlayEnabled) return;

    //--for autoPlayDuration toggle and default case
    startAutoPlay();

    //--run cleanup  before -re-renders and after unmount
    return () => stopAutoPlay();
  }, [autoPlayDuration, isAutoPlayEnabled]);

  function startAutoPlay() {
    if (slider.current.autoPlayId !== 0) return;
    //--
    slider.current.autoPlayId = setInterval(() => {
      if (slider.current.isTransitioning || slider.current.reset.start) return; //guard
      updateSlider("forward");
    }, autoPlayDuration);
  }

  function stopAutoPlay() {
    if (slider.current.autoPlayId === 0) return;
    //--
    clearInterval(slider.current.autoPlayId);
    slider.current.autoPlayId = 0;
  }

  function resetSlider() {
    const { reset, totalSlideIndexCount } = slider.current;
    // -- reset on real first or real last
    const resetValue =
      reset.action === "realFirst" ? 0 : totalSlideIndexCount * 100;
    moveSlideTrack({ isFast: true, translate: resetValue });
    slider.current.baseTranslate = resetValue;
    slider.current.reset.action = null;
    slider.current.reset.start = false;
  }

  function updateIndicator(nextSlideIndexCount) {
    //update crousel indicator and ensure to reset its a clone slide
    switch (nextSlideIndexCount) {
      case -1:
        slider.current.reset.start = true;
        slider.current.reset.action = "realLast";
        setSlideIndexCount(slider.current.totalSlideIndexCount);
        return;

      case slider.current.totalSlideCount:
        slider.current.reset.start = true;
        slider.current.reset.action = "realFirst";
        setSlideIndexCount(0);
        return;

      default:
        //--for not clone slide
        setSlideIndexCount(nextSlideIndexCount);
        return;
    }
  }

  function updateSlider(action) {
    const { baseTranslate } = slider.current;
    //-compute the requried value needed to go to next slide
    const nextTranslate =
      action === "forward"
        ? Math.round(baseTranslate + 100)
        : Math.round(baseTranslate - 100);

    // --update crousel indcator
    const nextSlideIndexCount = nextTranslate / 100;
    updateIndicator(nextSlideIndexCount);

    // -- move slide track implement translate
    moveSlideTrack({
      isFast: false,
      translate: nextTranslate,
    });
    //maintain info refs
    slider.current.baseTranslate = nextTranslate;
    swipe.current.currentSwipe = 0; //not needed but to make debugging easier i am adding this.
  }

  function snapBackTrack() {
    moveSlideTrack({
      isFast: false,
      translate: Math.round(slider.current.baseTranslate),
      duration: "400ms",
    });

    swipe.current.swipeTranslate = 0;
    swipe.current.currentSwipe = 0;
    if (isLightBox) disableLightBoxBtn(false);
  }

  function validateSwipe() {
    touch.current.active = false;
    const { swipeTranslate } = swipe.current;

    if (!isLoop && swipe.current.isBeyondEnd) {
      snapBackTrack();
      return;
    }

    // --validate swipe and update
    if (swipeTranslate > 15) updateSlider("forward");
    else if (swipeTranslate < -15) updateSlider("backward");
    else snapBackTrack();
  }

  function getBoundarySwipeData(limit) {
    const data = { isOverSwipe: false, isHitLimit: false };
    const { currentSwipe, swipeTranslate } = swipe.current;
    /* -(the reason i have to check both currentSwipe and Translate as they both gets updated at different time so if i depend only on one of them, then i will loose the capability they both provide, which is strict stopping at 30 and ability go back and dismiss snap) */
    switch (slideIndexCount) {
      case 0:
        if (swipeTranslate < 0) {
          data.isOverSwipe = true;
          if (swipeTranslate <= -limit && currentSwipe <= -limit) {
            data.isHitLimit = true;
          }
        }
        break;
      default:
        if (swipeTranslate > 0) {
          data.isOverSwipe = true;
          if (swipeTranslate >= limit && currentSwipe >= limit) {
            data.isHitLimit = true;
          }
        }
        break;
    }

    // --
    return data;
  }

  function handlePointerEnd(e) {
    if (touch.current.active) validateSwipe();
    else if (touch.current.focused) disableLightBoxBtn(false);
    // --

    if (touch.current.focused) {
      touch.current.focused = false;
      if (isAutoPlayEnabled) startAutoPlay(); //-- this will not run in non-loop case
    }
  }

  function moveSlideTrack({
    isFast,
    translate,
    duration = defineTransitionDuration,
  }) {
    const { style } = slideTrackEl.current; //!cache it on pointerDown

    //set right duration
    if (isFast && style.transitionDuration !== "0ms") {
      style.transitionDuration = "0ms";
    } else if (!isFast) {
      if (style.transitionDuration !== duration) {
        style.transitionDuration = duration;
      }
    }

    // --translate
    const loopOffset = isLoop ? "- 100%" : ""; //-cache it
    style.transform = `translate${axis}(calc(${-translate}% ${loopOffset}))`;
  }

  function disableLightBoxBtn(value) {
    //!lightBoxBtn.current.disabled i got an erro saying i cannot fine wheather it is disable or not not exactly like this but close. do check it later.
    if (
      lightBoxBtn.current.disabled === value ||
      slider.current.isCarouselBtnActive ||
      lightBoxBtn.current.dataset.lightBoxOpen === "true"
    ) {
      return;
    }
    lightBoxBtn.current.disabled = value;
  }

  function onPointerMoveHandler(e) {
    if (!touch.current.focused) return;
    // --
    touch.current.endPoint = e[`client${axis}`];
    const { startPoint, endPoint, active } = touch.current;
    const { trackLength, baseTranslate } = slider.current;
    // --
    const delta = startPoint - endPoint;
    const nextSwipeTranslate = (delta / trackLength) * 100;
    swipe.current.currentSwipe = nextSwipeTranslate;
    //-- to show quick snap-back movement, for non-loop mode over boundary swipe
    if (!isLoop && isEnd) {
      const { isOverSwipe, isHitLimit } = getBoundarySwipeData(30);
      swipe.current.isBeyondEnd = isOverSwipe;
      //--
      if (isOverSwipe && isHitLimit) return;
    }
    // --
    moveSlideTrack({
      isFast: true,
      translate: baseTranslate + nextSwipeTranslate,
    });
    swipe.current.swipeTranslate = nextSwipeTranslate;
    // --only run the code if it is false
    if (!active) touch.current.active = true;
  }

  function onPointerDownHandler(e) {
    //return if rest or transition is active
    const { isTransitioning, reset } = slider.current;
    if (isTransitioning || reset.start) return;
    //--
    if (isAutoPlayEnabled) stopAutoPlay();
    //--gather touch details
    touch.current.focused = true;
    touch.current.startPoint = e[`client${axis}`];

    //release pointer capturing when there is one
    if (isTouchConstraint) {
      const isCapture = e.target.hasPointerCapture(e.pointerId);
      if (isCapture) e.target.releasePointerCapture(e.pointerId);
    }
    //cache slider track style ref

    //define the right track length
    const { clientWidth, clientHeight } = e.currentTarget;
    slider.current.trackLength = isAxisX ? clientWidth : clientHeight;
    //disable lightbox btn
    if (isLightBox) disableLightBoxBtn(true);
  }

  return (
    <div
      style={{ "--slider-radius": LightBoxBorderRadius }}
      ref={slideContainerEl}
      className="size-full"
    >
      <div
        ref={slideEl}
        onPointerDown={onPointerDownHandler}
        onPointerMove={onPointerMoveHandler}
        onPointerUp={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
        className={`relative size-full cursor-grab ${isAxisX ? "touch-pan-y" : "touch-pan-x"} select-none active:cursor-grabbing`}
      >
        {isLightBox && (
          <SliderLightBoxPlugin
            ref={lightBoxBtn}
            slideContainerEl={slideContainerEl}
            slideEl={slideEl}
          />
        )}
        <div className="absolute inset-0 overflow-clip">
          <div
            ref={slideTrackEl}
            onTransitionStart={() => (slider.current.isTransitioning = true)}
            onTransitionEnd={() => {
              slider.current.isTransitioning = false;
              if (slider.current.reset.start) resetSlider();
              if (isLightBox) disableLightBoxBtn(false);
            }}
            style={{
              transform: isLoop ? `translate${axis}(-100%)` : undefined,
            }}
            className={`ease-smooth flex size-full *:size-full *:shrink-0 *:object-cover *:object-center ${
              isAxisX ? "" : "flex-col"
            }`}
          >
            {/* if children then chidren else the standard way */}
            {children || (
              <>
                {isLoop && (
                  <OptimizedImg
                    data-clone="last"
                    imgName={imgNameArr[imgNameArr.length - 1]}
                    isDraggable={false}
                  />
                )}

                {imgNameArr.map((imgName, i) => (
                  <OptimizedImg
                    key={i}
                    imgName={imgName}
                    isDraggable={false}
                    isLoadFast={i <= 2}
                  />
                ))}
                {isLoop && (
                  <OptimizedImg
                    data-clone="first"
                    imgName={imgNameArr[0]}
                    isDraggable={false}
                  />
                )}
              </>
            )}
          </div>

          {isAxisX ? (
            <HorizontalSliderNavigation
              slider={slider}
              stopAutoPlay={stopAutoPlay}
              startAutoPlay={startAutoPlay}
              isLoop={isLoop}
              slideIndexCount={slideIndexCount}
              isAutoPlayEnabled={isAutoPlayEnabled}
              updateSlider={updateSlider}
              isCrouselBtnHidden={isCrouselBtnHidden}
              isLightBox={isLightBox}
              disableLightBoxBtn={disableLightBoxBtn}
            />
          ) : (
            <VerticalSliderNavigation
              slider={slider}
              slideIndexCount={slideIndexCount}
            />
          )}
        </div>
      </div>
    </div>
  );
}
