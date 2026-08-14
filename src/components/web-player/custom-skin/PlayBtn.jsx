import { useEffect } from "react";
import { SpriteIcon } from "../../SpriteIcon";
import { useMedia, usePlayer } from "@videojs/react";

export function PlayBtn() {
  //!i think i shoudl create a component that can updates ui on click, rather then creating them seperately
  //!youtube does is maybe it will look good try to animate the transition from pause to play. and add ripple effect of all.
  const togglePaused = usePlayer((state) => state.togglePaused);
  const isPaused = usePlayer((state) => state.paused);

  return (
    <button onClick={togglePaused}>
      {isPaused ? (
        <SpriteIcon className="size-6.5 fill-white" iconName="play" />
      ) : (
        <SpriteIcon className="size-7.25 fill-white" iconName="pause" />
      )}
    </button>
  );
}
