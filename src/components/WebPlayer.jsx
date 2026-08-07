import { ProgressBar } from "./ProgressBar";
import { SpriteIcon } from "./SpriteIcon";

export function WebPlayer({ variant }) {
  return (
    <div className="font-poppins flex size-full flex-col justify-between bg-gray-800 px-4 py-3 font-medium text-white">
      <div className="flex justify-between *:cursor-pointer *:rounded-full *:p-3.5">
        <button>
          <SpriteIcon className="size-6.5 fill-white" iconName="play" />
        </button>
        <button>
          <SpriteIcon className="size-6.5 fill-white" iconName="share" />
        </button>
      </div>

      <div>
        <button className="mb-2 ml-auto block w-fit cursor-pointer rounded-full bg-white px-1.75 py-1.5">
          <SpriteIcon className="size-7 fill-black" iconName="more-options" />
        </button>

        <div>
          {variant === "creator" ? (
            <div className="mb-2 flex items-center gap-3 text-xs">
              <span className="inline-block size-10 shrink-0 rounded-full bg-white"></span>
              <p className="shrink-0">Devender Singh</p>
              <button className="ml-5 cursor-pointer rounded-full bg-white px-3.75 py-2.25 text-black">
                Follow
              </button>
            </div>
          ) : (
            <button className="mb-2 cursor-pointer rounded-full bg-white px-3.75 py-2.25 text-xs text-black">
              Discover
            </button>
          )}
          <h3>Place Your Tittle Here</h3>
          <ProgressBar axis="X" />
        </div>
      </div>
    </div>
  );
}
