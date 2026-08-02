import { useRef } from "react";
import { useEffect, useState } from "react";

export function useMediaQuery(query, { relative }) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);
  /* ti will be cool to give it taliwnd break points so that i can do md and all and get a value thinka bout it later.  */
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches); //initial sync on dependency change and after hook 1st render.
    const changeHandler = (e) => setMatches(e.matches);

    // --
    media.addEventListener("change", changeHandler);
    return () => media.removeEventListener("change", changeHandler);
  }, [query]);

  return matches;
}
