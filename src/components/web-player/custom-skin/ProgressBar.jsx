import { usePlayer } from "@videojs/react";
import { useEffect, useRef } from "react";
// !mainBarBgClassName,progressBarClassname, ThumbClassName, make ti configuration later.
//! i might watn the pointer capturing to get release as soon as the poitner is out of video player.

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
  // --

  /* bug founded: during extremely agressive interaction with seek bar, and very fast pause
play request, i sent true, false, true, and react even re-render after play becuause it leave the mid false
in between and see then next update true, and then compares with the previous state value
and it sees no difference and avoids to re-render aka my seek bar get stucked at a point. useEffect never runs. this is what i need to fix. 
*/

  useEffect(() => {
    if (duration === 0 || thumb.current.focused) return;
    const videoProgress = (currentTime / duration) * 100;
    const value = `${paused ? videoProgress : 100}%`;
    // --
    applyStyles(value);
  }, [duration, paused]);

  if (duration === 0) return null;

  function applyStyles(value) {
    thumbEl.current.style.left = value;
    progressBarEl.current.style.width = value;
  }

  function handlePointerUp(e) {
    if (!thumb.current.focused) return;
    thumb.current.focused = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    // --
    const { trackLength, currentPosition } = thumb.current;
    // progress bar width in percentage
    const ProgressPercentage = (currentPosition / trackLength) * 100; //*proportion can only work
    //use progressPercentage to find current duration from duration
    const toSeek = Math.round(duration * (ProgressPercentage / 100));
    seek(toSeek).finally(play);
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
    pause();
    //define the right track length
    const { clientWidth, clientHeight } = e.currentTarget;
    thumb.current.trackLength = isAxisX ? clientWidth : clientHeight;
    thumb.current.focused = true; //set thumb details

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
      className={`cursor-pointer ${isAxisX ? "touch-pan-y" : "touch-pan-x"} py-3 select-none *:pointer-events-none active:cursor-grabbing active:[&>div>*]:duration-0! hover:[&>div>button]:opacity-100`}
      // active:[&>div]:h-1.75 try it later
    >
      {/* <input className="w-full rounded-none bg-amber-400" type="range" name="" id="" /> see if the progress bar can be built on top of it, it is more semantic*/}
      <div className="relative flex h-1 w-full items-center bg-gray-400">
        <span
          ref={progressBarEl}
          className="inline-block h-full bg-white transition-[width] duration-(--move-duration) ease-linear"
        ></span>

        <button
          ref={thumbEl}
          style={{
            transitionProperty: "left, opacity",
            transitionTimingFunction: "linear, ease-in-out",
            transitionDuration: "var(--move-duration), 75ms",
          }}
          className="absolute size-4 -translate-x-1/2 rounded-full bg-white opacity-0 shadow-2xl"
        ></button>
      </div>
    </div>
  );
}
