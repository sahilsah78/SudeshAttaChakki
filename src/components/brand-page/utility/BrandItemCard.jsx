import { SpriteIcon } from "../../SpriteIcon";
import cornImg from "../../../assets/cornImg.webp";

export function BrandItemCard({ title, price }) {
  // !all teh images need to warped in archor tag plus they need alt attribute for semantic purpose as of now i am leaving it but later do it.
  //! i want whole card to have a shiny effect when user hover i can enahance the premimum feel.
  return (
    <div className="bg-warm-cream relative w-49.5 rounded-md border border-[#F5E0C1] p-3.5 text-center">
      <span className="bg-golden-amber absolute top-0 left-1.5 inline-block rounded-2xl px-3 py-px">
        <SpriteIcon className="size-11.5" iconName="freshAndPure" />
      </span>
      <img
        className="h-32 w-full rounded-[8.5px] object-cover object-center select-none"
        draggable="false"
        src={cornImg}
        alt={`${title} image`}
      />
      <h4
        className={`font-merriweather text-maroom pt-2.5 ${title.length > 17 ? "pb-2" : "pb-9"} text-lg font-bold`}
      >
        {title}
      </h4>
      <p className="font-poppins mb-3 text-sm font-semibold">₹{price}/kg</p>
      <button className="active:bg-golden-amber/90 bg-golden-amber shadow-btn cursor-pointer rounded-[10px] px-8 py-4 text-xs font-bold text-white">
        {/* //!maybe add a shine effect when button is hovered or clicked. */}
        <SpriteIcon className="h-2.25 w-22" iconName="addToCartText" />
      </button>
    </div>
  );
}
