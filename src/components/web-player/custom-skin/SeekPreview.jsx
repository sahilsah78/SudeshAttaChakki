import { SpriteIcon } from "../../SpriteIcon";

export function SeekPreview({ seekPreviewEl, seekTimeEl }) {
  //start from here.
  //timing and visiblity needs to be managed, boom alot of tricky work.
  //!think about adding ms to timestamp: as of now i think it will be unecessary so i am not doing it.
  return (
    <div
      ref={seekPreviewEl}
      className="absolute opacity-0 bottom-7.5 w-fit -translate-x-1/2 transition-opacity"
    >
      <time
        ref={seekTimeEl}
        dateTime="PT0M0S"
        className="mx-auto mb-3 block w-15.5 rounded-[7px] bg-white py-0.75 text-center text-sm text-black shadow-2xl"
      >
        00:00
      </time>
      <div className="h-57 w-35 rounded-[10px] border-3 border-white bg-amber-300 shadow-2xl"></div>
      {/* <span className="border-30 border-b-0 border-transparent border-t-amber-200 size-0  inline-block "></span> */}
      {/* <SpriteIcon
        iconName="tooltip-arrow"
        className="relative left-2 -z-1 -mt-1.75 size-5 fill-white"
      /> */}
    </div>
  );
}
