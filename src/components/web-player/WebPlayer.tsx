import { createPlayer, videoFeatures } from "@videojs/react";
import { Video } from "@videojs/react/video";
import { CustomSkin } from "./custom-skin/CustomSkin";

const player = createPlayer({ features: videoFeatures });

interface MyPlayerProps {
  src: string;
  variant: string;
}

export function WebPlayer({ src, variant }: MyPlayerProps) {
  return (
    <player.Provider>
      <CustomSkin variant={variant}>
        <Video src={src} playsInline />
      </CustomSkin>
    </player.Provider>
  );
}
