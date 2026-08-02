import { useState } from "react";
import { SpriteIcon } from "./SpriteIcon";

export function SliderLightBoxPlugin({ ref, slideEl, slideContainerEl }) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  //!implement a universal debounce methods and intergrate with on swipe zoom btn off feature.
  //!i think later i should make the transtion duration configurable.
  const containerActive = [
    "fixed",
    "inset-0",
    "z-100",
    "flex",
    "items-center",
    "justify-center",
    "bg-black/70",
    "backdrop-blur-xs",
    "*:h-[70%]",
    "*:max-h-[600px]",
    "*:w-[90%]",
    "*:max-w-[1024px]",
    "*:transition-all",
    "*:duration-600",
    "max-md:pb-2",
    "sm:*:w-[80%]",
    "md:*:w-[70%]",
  ];
  const slideActive = [
    "[&>div]:rounded-[var(--slider-radius)]",
    "[&>div]:bg-black/70",
  ];
  function onClickHandler(e) {
    if (!slideEl.current || !slideContainerEl.current) return; //ref are assinged during commit phrase

    /* overflow approach to disable-scroll use to fail in safari but back in 2019 in IOS 13 it was 
       fixed so we can rely on it unless that srollbar hidden jump hurts ux. */
    const nextState = !isLightBoxOpen;

    if (nextState) {
      slideContainerEl.current.classList.add(...containerActive);
      slideEl.current.classList.add(...slideActive);
    } else {
      slideContainerEl.current.classList.remove(...containerActive);
      requestAnimationFrame(() => {
        slideContainerEl.current.classList.remove("*:duration-600");
      });
      slideEl.current.classList.remove(...slideActive);
    }

    document.body.classList.toggle("overflow-hidden", nextState);
    // --
    setIsLightBoxOpen(nextState);
  }

  return (
    <button
      ref={ref}
      disabled={false}
      // the data-light... is maintained for parent component so that current state can be know of lighbox useState is there for component re-render and data is to share info with parent component
      data-light-box-open={isLightBoxOpen}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={onClickHandler}
      className={`absolute z-10 cursor-pointer ${isLightBoxOpen ? "top-0 right-0 translate-y-[-120%] sm:translate-x-[120%]" : "top-1 right-1"} rounded-full bg-white/40 p-1.75 shadow-md backdrop-blur-sm hover:bg-white active:bg-white disabled:opacity-0 sm:transition-colors`}
    >
      {isLightBoxOpen ? (
        <SpriteIcon className="size-7 fill-black" iconName="minimizer" />
      ) : (
        <SpriteIcon className="size-3 fill-black" iconName="maximizer" />
      )}
    </button>
  );
}
