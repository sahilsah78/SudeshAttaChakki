export function useThrottle(fn, time) {
  //!think of adding return behvaiour as well. so that fn result can also be sent, after thinking i don't think it possible but there might be a way to make it happen straight it cannot happen but maintianing extra data storage it is possible. 

  let startTime = Date.now();
  let isTimeout = null;
  let latestArgs = null;
  // --
  function executeAndReset() {
    startTime = Date.now();
    fn(...latestArgs);//because of closure this varialbe will resolve into last assigned value.
  }

  function callHandler(...argsArr) {
    const currentTime = Date.now();
    const delta = currentTime - startTime;
    latestArgs = argsArr;//updating on each call
    if (delta >= time && !isTimeout) executeAndReset();//immediate execution
    else if (!isTimeout) {
      isTimeout = setTimeout(() => {
        executeAndReset();
        isTimeout = null;
      }, time - delta);
    }
  }

  return callHandler;
}


