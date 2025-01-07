export const ajax = (url: string) => {
  fetch(url)
    .then((resp) =>
      resp.ok ? resp.json() : resp.json().then((error) => error)
    )
    .then((data) => data);
};
