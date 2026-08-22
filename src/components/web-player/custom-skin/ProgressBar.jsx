import { useMedia, usePlayer } from "@videojs/react";
import { useEffect, useRef } from "react";
import { useThrottle } from "../../Hooks/useThrottle";
import { SeekPreview } from "./SeekPreview";

// !mainBarBgClassName,progressBarClassname, ThumbClassName, make ti configuration later.
//! i might watn the pointer capturing to get release as soon as the poitner is out of video player.
//! there is a problem the thumb is going beyound the end of track,
//! i might want to, do nto let the thumb get past the tracks,
//axis handling
// const { style } = thumbEl.current; //!cache it on pointerDown
/* progress bar should be in perfect sync with the actual video current duration */
//evaluate wheather to move this to getBoudingRect or not.

export function ProgressBar({ axis: setAxis }) {
  //--axis handling
  const axis = setAxis.toUpperCase();
  const isAxisX = axis === "X" ? true : false;

  const thumb = useRef({
    focused: false,
    trackLength: 0,
    progressPercent: 0,
    seekDuration: 0,
  });
  const thumbEl = useRef(null);
  const progressBarEl = useRef(null);
  const seekPreviewEl = useRef(null);
  const seekTimeEl = useRef(null);
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
    applySeekStyles(value);
  }, [duration, paused]);

  if (duration === 0) return null;

  function applySeekStyles(value) {
    progressBarEl.current.style.width = value;
    thumbEl.current.style.left = value;
  }

  function handlePointerUp(e) {
    thumb.current.focused = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    // --
    seekPreviewEl.current.style.opacity = 0;
    throttleSeek(thumb.current.seekDuration);
  }
  function getTimeStamp(value) {
    const seconds = Math.floor(value);
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const strMin = String(min).padStart(2, "0");
    const strSec = String(sec).padStart(2, "0");

    return {
      dateTime: `PT${min}M${sec}S`,
      formatTime: `${strMin}:${strSec}`,
    };
  }
  function clampNum(lower, upper, value) {
    //it deals with number data type only
    if (lower >= value) return lower;
    if (upper <= value) return upper;
    return value;

    // Math.min(upper, Math.max(lower, value));
  }
  function isNumWithinBounds(lower, upper, value) {
    //it deals with number data type only
    return value >= lower && value <= upper;
  }

  function updateSeekUI(e) {
    //*using perctage to set value */

    //finding percentage
    const currentPosition = e.nativeEvent[`offset${axis}`];
    const percent = (currentPosition / thumb.current.trackLength) * 100;
    if (!isNumWithinBounds(0, 100, percent)) return; //save processing for a hotpath

    const seekFinal = percent;
    applySeekStyles(`${seekFinal}%`);

    // clamp percentage between 35-65
    const previewFinal = clampNum(35, 65, percent);
    seekPreviewEl.current.style.left = `${previewFinal}%`;
    seekPreviewEl.current.style.opacity = 100;

    // update thumb details.
    thumb.current.seekDuration = duration * (seekFinal / 100);
    thumb.current.progressPercent = seekFinal;

    //handle time stamp
    const { dateTime, formatTime } = getTimeStamp(
      thumb.current.seekDuration,
    );
    //!create a throttle where callback only runs when value changes else no.
    seekTimeEl.current.textContent = formatTime;
    seekTimeEl.current.dateTime = dateTime;
  }

  function onPointerMoveHandler(e) {
    if (thumb.current.focused) updateSeekUI(e);
  }

  function onPointerDownHandler(e) {
    thumb.current.focused = true; //set thumb details
    if (!paused) pause();
    //define the right track length
    const { clientWidth, clientHeight } = e.currentTarget;
    thumb.current.trackLength = isAxisX ? clientWidth : clientHeight;
    //--
    updateSeekUI(e);
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
      <SeekPreview
        seekPreviewEl={seekPreviewEl}
        seekTimeEl={seekTimeEl}
      />
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
