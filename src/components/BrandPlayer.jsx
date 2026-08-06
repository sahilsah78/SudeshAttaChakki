export function BrandPlayer({ videoUrl }) {
  const videoId = videoUrl.split("vimeo.com")[1]; //!make it less buggy later

  {
    /* <div style="padding:177.78% 0 0 0;position:relative;"><iframe frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Make_it_in_hindi"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script> */
  }

  /*  return (
    <div>
      <div style="padding:177.78% 0 0 0;position:relative;">
        <iframe
          src="https://player.vimeo.com/video/1216061635?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          style="position:absolute;top:0;left:0;width:100%;height:100%;"
          title="Make_it_in_hindi"
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
  ); */

  return (
    <div className="size-full">
      <div className="relative size-full">
        <iframe
          src="https://player.vimeo.com/video/1216061635?control=0"
          frameborder="0"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            top: "10px",
            width: "100%",
            height: "140%",
          }}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          title="Silly Little Plastic Cat"
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
  );
}
