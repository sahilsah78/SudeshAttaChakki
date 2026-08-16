export function useHardThrottle(fn, time) {
  let startTime = Date.now();
  // --
  function callHandler(...argsArr) {
    const currentTime = Date.now();
    const delta = currentTime - startTime;

    if (delta >= time) {
      startTime = Date.now();
      fn(...argsArr);
    }
  }

  return callHandler;
}

/* //? hard throttle; has no trailing behaviour it does not consider the in between calls
//*rudimentary and strict in approach there hard. */