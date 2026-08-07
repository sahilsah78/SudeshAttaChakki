import { useRef } from "react";

export function ProgressBar({ axis: setAxis }) {
  // !mainBarBgClassName,progressBarClassname, ThumbClassName, make ti configuration later.
  //! i might watn the pointer capturing to get release as soon as the poitner is out of video player.
  //! there is a problem the thumb is going beyound the end of track, 
  //axis handling
  const axis = setAxis.toUpperCase();
  const isAxisX = axis === "X" ? true : false;

  const thumb = useRef({
    focused: false,
    endPoint: 0,
    trackLength: 0,
  });
  const thumbEl = useRef(null);
  const progressBarEl = useRef(null);

  function moveThumb(value) {
    if (0 > value) {
      applyStyle(0);
    } else if (thumb.current.trackLength < value) {
      applyStyle(thumb.current.trackLength);
    } else applyStyle(value);

    // const { style } = thumbEl.current; //!cache it on pointerDown

    function applyStyle(value) {
      thumbEl.current.style.left = `${value}px`;
      progressBarEl.current.style.transform = `scaleX(${value})`;
    }
  }

  function handlePointerEnd(e) {
    if (thumb.current.focused) {
      thumb.current.focused = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }

  function onPointerMoveHandler(e) {
    if (!thumb.current.focused) return;
    // --
    thumb.current.endPoint = e.nativeEvent[`offset${axis}`];
    moveThumb(thumb.current.endPoint);
  }

  function onPointerDownHandler(e) {
    //set thumb details
    thumb.current.focused = true;

    e.currentTarget.setPointerCapture(e.pointerId);

    //define the right track length
    const { clientWidth, clientHeight } = e.currentTarget;
    thumb.current.trackLength = isAxisX ? clientWidth : clientHeight;
    //!cache progressBar track style ref
  }

  return (
    <div
      onPointerDown={onPointerDownHandler}
      onPointerMove={onPointerMoveHandler}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      className="cursor-pointer py-3 select-none active:cursor-grabbing"
    >
      <div className="relative flex h-1 w-full items-center bg-gray-400 *:pointer-events-none">
        <span
          ref={progressBarEl}
          className="inline-block h-full w-px origin-[left] bg-white"
        ></span>
        {/* chant the arranements if possible html shoudl it self make the bar big and small. */}
        <span
          ref={thumbEl}
          className="absolute inline-block size-4 -translate-x-1/2 rounded-full bg-white shadow-2xl duration-0"
        ></span>
      </div>
    </div>
  );
}
