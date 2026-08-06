export function YoutubeIframeWrapper({ videoUrl }) {
  return (
    <div className="flex size-full items-end justify-center overflow-hidden">
      <iframe
        width="100%"
        height="114%"
        src={`${videoUrl}&controls=0&modest-branding=1&rel=0&playsinline=1&fs=0&disablekb=1&iv_load_policy=3&enablejsapi=1`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}
