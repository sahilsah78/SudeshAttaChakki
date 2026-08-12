import { BrandSectionTitle } from "./utility/BrandSectionTitle";
import mudPaper from "../../assets/mudPaper.webp";
import { BrandTestimonialTextBox } from "./utility/BrandTestimonialTextBox";
import { OptimizedImg } from "../OptimizedImg";
import video from "../../assets/video/Sudhesh atta_chakki_introductory_video.mp4";
import { WebPlayer } from "../web-player/WebPlayer";

export function BrandTestimonialSection(params) {
  /*//! add this to video player
     a centered play button
a small duration chip (0:48) */
  //  ! ifeel like it needs alot of tweaking for best tweaks, first enable video player then go about tweaking it.
  //i need to make it grid-flex from grid only to ensure,the video player size does not quirks else the visual experience can be not so good.
  const reviews = [
    {
      className: "col-span-2 bg-[#8E4A21]",
      isQuoteVisible: true,
      userName: "Ayesha Kapoor",
      userOccupation: "Home Baker",
      userReview:
        "The flour smells genuinely fresh and makes a noticeable difference in both rotis and baked goods. I like that every batch is ground after I place my order instead of sitting on shelves for weeks. It feels clean, wholesome, and worth choosing over packaged alternatives.",
    },
    {
      userName: "Rohit Sharma",
      userOccupation: "Working Professional",
      userReview:
        "I've ordered several times now, and the quality has stayed consistent. Freshly milled flour tastes better, cooks well, and always arrives exactly as promised.",
    },
    {
      className: "bg-cream! text-black!",
      userName: "Neha Verma",
      userOccupation: "Homemaker",
      userReview:
        "The texture is soft, the aroma is natural, and the rotis stay fresh much longer. It's now my preferred place for buying flour every month.",
    },
    {
      className: "col-span-2",
      userName: "Arjun Mehta",
      userOccupation: "Restaurant Owner",
      userReview:
        "Consistency matters in our kitchen, and this flour has been reliable with every order. The freshness is immediately noticeable, the quality never feels compromised, and knowing it's milled on demand gives us much more confidence than buying ordinary packaged flour.",
    },
  ];

  return (
    <section
      style={{ backgroundImage: `url(${mudPaper})` }}
      className="bg-repeat px-5 pb-6 max-sm:px-10 sm:px-20"
    >
      <BrandSectionTitle
        titleText="What People Think About Us"
        subTitleText="Because good food speaks through people’s trust."
      />
      <div className="mx-auto mt-14 max-w-140 max-[480px]:*:not-last:mb-3 min-[480px]:grid min-[480px]:grid-cols-2 min-[480px]:gap-3 lg:max-w-240 lg:grid-cols-4">
        {reviews.map((reviews, i) => (
          <BrandTestimonialTextBox key={i} {...reviews} />
        ))}
        <div className="h-[80svh] w-[min(100%,310px)] justify-self-center overflow-clip rounded-xl bg-black max-lg:col-span-full max-lg:mt-24 lg:col-start-4 lg:row-span-2 lg:row-start-1 lg:h-auto [&>div]:size-full">
          {/* <WebPlayer
            src="https://res.cloudinary.com/t8yzcvhg/video/upload/v1786174145/Make_it_in_hindi_e8fulu.mp4"
            variant="brand"
          /> */}
          <WebPlayer src={video} variant="brand" />
          {/* <video className="size-full" controls src={video}></video> */}
        </div>
      </div>
    </section>
  );
}
