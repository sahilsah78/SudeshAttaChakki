import mudPaper from "../../assets/mudPaper.webp";
import { RippleEffect } from "../RippleEffect";
import { SpriteIcon } from "../SpriteIcon";
import { BrandItemCard } from "./utility/BrandItemCard";
import { BrandSectionTitle } from "./utility/BrandSectionTitle";
import { EmblaCardSlider } from "../EmblaCardSlider";
export function BrandVarietySection() {
  return (
    <section
      style={{ backgroundImage: `url(${mudPaper})` }}
      className="bg-repeat"
    >
      <div className="mx-auto w-fit pb-12 md:relative">
        <BrandSectionTitle
          titleText="Variety Of Attas"
          subTitleText="Choose from fresh, Stone-ground atta’s"
        />
        {/* <div className="flex max-md:relative md:justify-center md:gap-x-6.5 > */}
        <EmblaCardSlider
          className="max-w-[335px] pt-20 pb-14 md:pt-15"
          cardtransitionDuration="400ms"
        >
          <BrandItemCard
            // extraClassName="max-[335px]:-mr-16 max-md:-mr-12 max-md:-rotate-6 max-md:scale-88"
            title={1}
            rate={50}
          />
          <BrandItemCard
            // extraClassName="max-md:absolute max-md:left-0 max-md:right-0 max-md:z-50"
            title={2}
            rate={50}
          />
          <BrandItemCard
            // extraClassName="max-md:absolute max-md:left-0 max-md:right-0 max-md:z-50"
            title={3}
            rate={50}
          />
        </EmblaCardSlider>
        {/* </div> */}
        <button className="border-golden-amber mx-auto flex items-center rounded-md border-2 bg-transparent px-4.5 py-2.25 md:absolute md:top-10 md:-right-13 md:px-3 md:py-1.5 lg:-right-15">
          {/* //!this button needs solid styling to go well with the ui, it is a ux ui concern there fore i am not working on it for now. */}
          <span className="font-poppins text-sm">Visit Store</span>
          {/* //!give this button a fill in and out effect later. */}
          <SpriteIcon
            className="ml-2 size-4.5 stroke-[#6f2419]"
            iconName="arow-right"
          />
          {/* we need to modifie ripple if we want to attach in here.  */}
        </button>
      </div>
    </section>
  );
}
