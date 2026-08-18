import { useMedia, usePlayer } from "@videojs/react";
import { useEffect, useRef } from "react";
import { useThrottle } from "../../Hooks/useThrottle";

// !mainBarBgClassName,progressBarClassname, ThumbClassName, make ti configuration later.
//! i might watn the pointer capturing to get release as soon as the poitner is out of video player.
//! there is a problem the thumb is going beyound the end of track,
//! i might want to, do nto let the thumb get past the tracks,
//axis handling
/* progress bar should be in perfect sync with the actual video current duration */
//evaluate wheather to move this to getBoudingRect or not.

export function ProgressBar({ axis: setAxis }) {
  //--axis handling
  const axis = setAxis.toUpperCase();
  const isAxisX = axis === "X" ? true : false;

  const thumb = useRef({
    focused: false,
    currentPosition: 0,
    trackLength: 0,
  });
  const thumbEl = useRef(null);
  const progressBarEl = useRef(null);
  // --API'S
  const duration = usePlayer((state) => state.duration);
  const paused = usePlayer((state) => state.paused);
  const { play, pause, seek, currentTime } = usePlayer();
  const media = useMedia();
  const throttleSeek = useThrottle((time) => {
    if (thumb.current.focused) return; //skip seek if interaction is active
    // --
    seek(time).finally(() => {
      if (!thumb.current.focused) play();
      //seek is called but interaction started again, so do not play.
      //as it will disturb the expected re-render sequence
    });
  }, 300);

  useEffect(() => {
    if (duration === 0 || thumb.current.focused) return;
    const videoProgress = (currentTime / duration) * 100;
    const value = `${paused ? videoProgress : 100}%`;
    // --
    applyStyles(value);
  }, [duration, paused]);

  if (duration === 0) return null;

  function applyStyles(value) {
    progressBarEl.current.style.width = value;
    thumbEl.current.style.left = value;
  }

  function handlePointerUp(e) {
    thumb.current.focused = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    // --
    const { trackLength, currentPosition } = thumb.current;
    // progress bar width in percentage
    const ProgressPercentage = (currentPosition / trackLength) * 100; //*proportion can also work
    //use progressPercentage to find current duration from duration
    const toSeek = Math.round(duration * (ProgressPercentage / 100));
    throttleSeek(toSeek);
  }

  function moveThumb(value) {
    let finalValue;
    if (0 >= value) {
      finalValue = 0;
    } else if (thumb.current.trackLength <= value) {
      finalValue = thumb.current.trackLength;
    } else finalValue = value;

    // const { style } = thumbEl.current; //!cache it on pointerDown
    applyStyles(`${finalValue}px`);

    // --update thumb current position
    thumb.current.currentPosition = finalValue;
  }

  function onPointerMoveHandler(e) {
    if (!thumb.current.focused) return;
    //move the thumb as per current position
    moveThumb(e.nativeEvent[`offset${axis}`]);
  }

  function onPointerDownHandler(e) {
    thumb.current.focused = true; //set thumb details
    if (!paused) pause();
    //--
    //define the right track length
    const { clientWidth, clientHeight } = e.currentTarget;
    thumb.current.trackLength = isAxisX ? clientWidth : clientHeight;

    moveThumb(e.nativeEvent[`offset${axis}`]); //move thumb at current position
    // --
    e.currentTarget.setPointerCapture(e.pointerId); //set Pointer capturing
  }
  return (
    <div
      onPointerDown={onPointerDownHandler}
      onPointerMove={onPointerMoveHandler}
      onPointerUp={handlePointerUp}
      style={{ "--move-duration": `${duration - currentTime}s` }}
      className={`cursor-pointer ${isAxisX ? "touch-pan-y" : "touch-pan-x"} relative py-3 select-none *:pointer-events-none active:cursor-grabbing hover:[&>div>button]:opacity-100`}
      // active:[&>div]:h-1.75 try it later
    >
      {/* <input className="w-full rounded-none bg-amber-400" type="range" name="" id="" /> see if the progress bar can be built on top of it, it is more semantic*/}
      <div className="relative flex h-1 w-full items-center bg-gray-400">
        <span
          ref={progressBarEl}
          className={`inline-block h-full bg-white duration-(--move-duration) ease-linear ${paused ? "transition-none" : "transition-[width]"}`}
        ></span>
        {/* add a size up animation for thumb btn */}
        <button
          ref={thumbEl}
          className={`absolute size-4 -translate-x-1/2 rounded-full bg-white shadow-2xl ${paused ? "transition-none" : "opacity-0 transition-[left,opacity]"} duration-[var(--move-duration),75ms] ease-[linear,ease-in-out]`}
        ></button>
      </div>
    </div>
  );
}
