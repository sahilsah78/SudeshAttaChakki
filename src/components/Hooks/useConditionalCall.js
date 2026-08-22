export function useConditionalCall(fn) {
  let latestArg = null;
  let prevArg = null;
  let conditionFn = null;
  let isFirst = true;
  function execute(latestArg) {
    fn(latestArg);
    prevArg = latestArg; //updating prev arg
  }
  //needs more work

  function callbackHandler(arg) {
    latestArg = arg; //updating on each call

    if (isFirst) {
      execute(latestArg);
      isFirst = false;
    } else if (conditionFn(latestArg, prevArg)) {
      execute(latestArg);
    }
  }

  return {
    condition: (callbackFn) => {
      conditionFn = callbackFn; //registering condition callback
      return callbackHandler;
    },
  };
}
