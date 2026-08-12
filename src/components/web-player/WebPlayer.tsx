import { createPlayer, videoFeatures } from "@videojs/react";
import { Video } from "@videojs/react/video";
import { CustomSkin } from "./custom-skin/CustomSkin";

const player = createPlayer({ features: videoFeatures });
/* try to get this working with vimeo later */
interface MyPlayerProps {
  src: string;
  variant: string;
}

export function WebPlayer({ src, variant }: MyPlayerProps) {
  return (
    <player.Provider>
    <player.Container>
      <CustomSkin variant={variant}>
        <Video src={src} playsInline />
      </CustomSkin>
    </player.Container>
    </player.Provider>
  );
}
