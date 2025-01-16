export const debounce = (func: () => void, delay: number) => {
  let timeoutID: any;

  return (...args: any) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
