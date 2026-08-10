import { useState } from "react";
import { SpriteIcon } from "../../SpriteIcon";
import { usePlayer } from "@videojs/react";

export function PlayBtn() {
  //!i think i shoudl create a component that can updates ui on click, rather then creating them seperately
  //!youtube does is maybe it will look good try to animate the transition from pause to play. and add ripple effect of all.
  const [isPaused, setIsPaused] = useState(true);
  const player = usePlayer();

  function onClickHandler(e) {
    const nextIsPaused = !isPaused;
    nextIsPaused ? player.pause() : player.play();
    setIsPaused(nextIsPaused);
  }

  return (
    <button onClick={onClickHandler}>
      {isPaused ? (
        <SpriteIcon className="size-6.5 fill-white" iconName="play" />
      ) : (
        <SpriteIcon className="size-7.25 fill-white" iconName="pause" />
      )}
    </button>
  );
}
