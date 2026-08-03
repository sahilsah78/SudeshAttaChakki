import { useMediaQuery } from "./Hooks/useMediaQuery";

export function SlidingText({
  className: extraClassName = "",
  text,
  fontSize: propFontSize,
  query,
}) {
  const isMatched = useMediaQuery(query);
  //*not needed for now but later i can add configurable animation duration
  //!shift it to flext track slider. architechture
  return (
    <p
      style={{
        fontSize: propFontSize,
        "--height": `calc(${propFontSize} * 1.2)`,
      }}
      className={`${extraClassName} ${isMatched ? "relative h-(--height) overflow-x-clip whitespace-nowrap" : ""}`}
    >
      {isMatched && <span className="animate-slide absolute px-2">{text}</span>}

      <span
        className={
          isMatched ? "animate-delayed-slide absolute px-2 opacity-0" : ""
        }
      >
        {text}
      </span>
    </p>
  );
}
