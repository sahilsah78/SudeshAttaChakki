import { useEffect } from "react";
import { usePlayer } from "@videojs/react";
import { IconBtn } from "../../IconBtn";

export function PlayBtn() {
  //!i think i shoudl create a component that can updates ui on click, rather then creating them seperately
  //!youtube does is maybe it will look good try to animate the transition from pause to play. and add ripple effect of all.
  const togglePaused = usePlayer().togglePaused;
  const isPaused = usePlayer((state) => state.paused);

  return (
    <IconBtn
      onClick={togglePaused}
      iconClassName={`${isPaused ? "size-6.5" : "size-7.25"} fill-white`}
      iconName={isPaused ? "play" : "pause"}
    />
  );
}
