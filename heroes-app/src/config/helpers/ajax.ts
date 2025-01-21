export const ajax = <T>(url: string, init?: RequestInit): Promise<T> => {
  return fetch(url, init)
    .then((resp) =>
      resp.ok ? resp.json() : resp.json().then((error) => Promise.reject(error))
    )
    .then((data: T) => data);
};
