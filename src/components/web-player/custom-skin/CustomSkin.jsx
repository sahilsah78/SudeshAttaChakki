import { ProgressBar } from "./ProgressBar";
import { SpriteIcon } from "../../SpriteIcon";
import { Children } from "react";
import { PlayBtn } from "./PlayBtn";
import { useContainerAttach } from "@videojs/react";
import { MoreOptions } from "./MoreOptions";

export function CustomSkin({ variant, children }) {
  //!the video can trimmed ideally it should not be trimmed get it checked.
  const setContainer = useContainerAttach();

  // !style the video js container with class later
  return (
    <div className="relative flex size-full items-center justify-center bg-black">
      <div className="font-poppins absolute inset-0 z-10 flex size-full flex-col justify-between px-4 pt-3 font-medium text-white">
        <div className="flex justify-between *:cursor-pointer *:rounded-full *:p-3.5">
          <PlayBtn />
        </div>
        <div>
          <MoreOptions />
          <div>
            {variant === "creator" ? (
              <div className="mb-2 flex items-center gap-3 text-xs">
                <span className="inline-block size-10 shrink-0 rounded-full bg-white"></span>
                <p className="shrink-0">Devender Singh</p>
                <button className="ml-5 cursor-pointer rounded-full bg-white px-3.75 py-2.25 text-black active:bg-white/90">
                  Follow
                </button>
              </div>
            ) : (
              <button className="mb-2 cursor-pointer rounded-full bg-white px-3.75 py-2.25 text-xs text-black active:bg-white/90">
                Discover
              </button>
            )}
            <h3 className="mb-2">Place Your Tittle Here</h3>
            <ProgressBar axis="X" />
          </div>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
