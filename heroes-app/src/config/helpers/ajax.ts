export const ajax = <T>(url: string): Promise<T> => {
  return fetch(url)
    .then((resp) =>
      resp.ok ? resp.json() : resp.json().then((error) => Promise.reject(error))
    )
    .then((data: T) => data);
};
