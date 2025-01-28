export const debounce = (func: (value: any) => void, delay: number) => {
  let timeoutID: any;
  return (...args: any) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
