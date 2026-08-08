import mudPaper from "../../assets/mudPaper.webp";
import { RippleEffect } from "../RippleEffect";
import { SpriteIcon } from "../SpriteIcon";
import { BrandItemCard } from "./utility/BrandItemCard";
import { BrandSectionTitle } from "./utility/BrandSectionTitle";
import { SwiperCardEffect } from "../sliders/card-slider/SwiperCardEffect";
import { useMediaQuery } from "../Hooks/useMediaQuery";
export function BrandVarietySection() {
  const attaProducts = [
    {
      title: "Mandua Atta",
      price: 68,
    },
    {
      title: "M.P Special Sharbati Atta",
      price: 82,
    },
    {
      title: "Makka Atta",
      price: 75,
    },
    {
      title: "Regular Chakki Atta",
      price: 62,
    },
  ];

  const isDesktop = useMediaQuery("(min-width: 960px)");

  return (
    <section
      style={{ backgroundImage: `url(${mudPaper})` }}
      className="overflow-x-hidden bg-repeat"
    >
      <div className={`mx-auto w-fit pb-12 min-[960px]:relative`}>
        <BrandSectionTitle
          titleText="Variety Of Attas"
          subTitleText="Choose from fresh, Stone-ground atta’s"
        />

        {isDesktop ? (
          <div className="mx-auto flex gap-x-6 pt-15 pb-14">
            {attaProducts.map(({ title, price }, i) => (
              <BrandItemCard key={i} title={title} price={price} />
            ))}
          </div>
        ) : (
          <SwiperCardEffect
            className="mx-auto w-49.5 max-w-[335px] pt-20 pb-14 md:pt-15"
            cardWidth="198px"
            cardRadius="6px"
            initialCardIndex={2}
          >
            {attaProducts.map(({ title, price }, i) => (
              <BrandItemCard key={i} title={title} price={price} />
            ))}
          </SwiperCardEffect>
        )}

        <button className="border-golden-amber mx-auto flex items-center rounded-md border-2 bg-transparent px-4.5 py-2.25 min-[960px]:absolute min-[960px]:top-10 min-[960px]:-right-8 min-[960px]:px-3 min-[960px]:py-1.5 lg:-right-15">
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
