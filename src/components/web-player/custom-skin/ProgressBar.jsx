import {
  selectControls,
  selectPlayback,
  selectTime,
  useMedia,
  usePlayer,
} from "@videojs/react";
import { useEffect, useRef } from "react";

export function ProgressBar({ axis: setAxis }) {
  // !mainBarBgClassName,progressBarClassname, ThumbClassName, make ti configuration later.
  //! i might watn the pointer capturing to get release as soon as the poitner is out of video player.
  //! there is a problem the thumb is going beyound the end of track,
  //! i might want to, do nto let the thumb get past the tracks,
  //axis handling
  /* progress bar should be in perfect sync with the actual video current duration */
  const axis = setAxis.toUpperCase();
  const isAxisX = axis === "X" ? true : false;

  const thumb = useRef({
    focused: false,
    active: false,
    endPoint: 0,
    trackLength: 0,
  });
  const thumbEl = useRef(null);
  const progressBarEl = useRef(null);
  const duration = usePlayer((state) => state.duration); //this is specific state subscription selector usePlayer offers. do not consfuse with context api way .
  const paused = usePlayer((state) => state.paused);
  const isSeeking = usePlayer((state) => state.seeking);
  // const { player.currentTime, player.seek, play, pause, waiting } = usePlayer();
  const player = usePlayer();

  if (duration === 0) return null;

  function moveThumb(value) {
    if (0 > value) {
      applyStyle(0);
    } else if (thumb.current.trackLength < value) {
      applyStyle(thumb.current.trackLength);
    } else applyStyle(value);

    // const { style } = thumbEl.current; //!cache it on pointerDown

    function applyStyle(value) {
      thumbEl.current.style.left = `${value}px`;
      progressBarEl.current.style.width = `${value}px`;
    }
  }

  function handlePointerEnd(e) {
    if (!thumb.current.focused) return;
    thumb.current.focused = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    // --
    if (!thumb.current.active) return;
    const { trackLength, endPoint } = thumb.current;
    const percentage = (endPoint / trackLength) * 100;
    const toSeek = Math.round(duration * (percentage / 100));

    player.seek(toSeek).then(() => player.play());

    /*
    //DEBUG: pending play
    async function startSeek(toSeek) {
      console.log("SEEK START", toSeek);
      const result = await player.seek(toSeek);
      console.log("SEEK end", result);
    }
    startSeek(toSeek); */
    thumb.current.active = false;
  }

  function onPointerMoveHandler(e) {
    if (!thumb.current.focused) return;
    thumb.current.endPoint = e.nativeEvent[`offset${axis}`];
    // --
    moveThumb(thumb.current.endPoint);
    if (!thumb.current.active) thumb.current.active = true;
  }

  function onPointerDownHandler(e) {
    if (!isSeeking) player.pause();

    //!thumb should move straight on pointer down itsel
    // --
    //set thumb details
    thumb.current.focused = true;
    e.currentTarget.setPointerCapture(e.pointerId);

    //define the right track length
    const { clientWidth, clientHeight } = e.currentTarget;
    thumb.current.trackLength = isAxisX ? clientWidth : clientHeight;
  }
  return (
    <div
      onPointerDown={onPointerDownHandler}
      onPointerMove={onPointerMoveHandler}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      style={{ "--move-duration": `${duration - player.currentTime}s` }}
      className={`cursor-pointer ${isAxisX ? "touch-pan-y" : "touch-pan-x"} py-3 select-none active:cursor-grabbing active:[&>div>*]:duration-0! hover:[&>div>button]:opacity-100`}
    >
      {/* <input className="w-full rounded-none bg-amber-400" type="range" name="" id="" /> see if the progress bar can be built on top of it, it is more semantic*/}
      <div className="relative flex h-1 w-full items-center bg-gray-400">
        <span
          ref={progressBarEl}
          style={{
            width: `${paused ? (player.currentTime / duration) * 100 : 100}%`,
          }}
          className="inline-block h-full bg-white transition-[width] duration-(--move-duration) ease-linear"
        ></span>

        <button
          ref={thumbEl}
          style={{
            left: `${paused ? (player.currentTime / duration) * 100 : 100}%`,
            transitionProperty: "left, opacity",
            transitionTimingFunction: "linear, ease-in-out",
            transitionDuration: "var(--move-duration), 75ms",
            transitionDelay: 0,
          }}
          className="absolute size-4 -translate-x-1/2 rounded-full bg-white opacity-0 shadow-2xl"
        ></button>
      </div>
    </div>
  );
}
