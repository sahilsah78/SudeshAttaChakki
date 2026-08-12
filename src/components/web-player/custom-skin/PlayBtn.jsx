import { useEffect } from "react";
import { SpriteIcon } from "../../SpriteIcon";
import { useMedia, usePlayer } from "@videojs/react";

export function PlayBtn() {
  //!i think i shoudl create a component that can updates ui on click, rather then creating them seperately
  //!youtube does is maybe it will look good try to animate the transition from pause to play. and add ripple effect of all.
  const togglePaused = usePlayer((state) => state.togglePaused);
  const isPaused = usePlayer((state) => state.paused);
  /*  
    //DEBUG: pending play
   const media = useMedia();
used it to debugg, play failure/ concluded vide is corrupt and fails with seeking.
  useEffect(() => {
    if (media === null) return;
    const events = [
      "play",
      "playing",
      "waiting",
      "canplay",
      "canplaythrough",
      "pause",
      "seeking",
      "seeked",
    ];

    const handlers = {};

    for (const evt of events) {
      handlers[evt] = () => {
        console.log("MEDIA EVENT:", evt);
      };

      media.addEventListener(evt, handlers[evt]);
    }

    // --
    return () => {
      for (const evt of events) {
        media.removeEventListener(evt, handlers[evt]);
      }
    };
  }, [media]); */

  return (
    <button
      onClick={togglePaused}
      /* 
    //DEBUG: pending play
      onClick={() => {
        if (isPaused) {
          console.log({
            readyState: media.readyState,
            networkState: media.networkState,
            paused: media.paused,
            currentTime: media.currentTime,
            duration: media.duration,
            ended: media.ended,
          });
          console.log(media.play().then(() => console.log("settled")));
          setTimeout(() => {
            console.log({
              readyState: media.readyState,
              networkState: media.networkState,
              paused: media.paused,
              currentTime: media.currentTime,
              duration: media.duration,
              ended: media.ended,
            });
          }, 5000);
        } else media.pause();
      }} */
    >
      {isPaused ? (
        <SpriteIcon className="size-6.5 fill-white" iconName="play" />
      ) : (
        <SpriteIcon className="size-7.25 fill-white" iconName="pause" />
      )}
    </button>
  );
}
