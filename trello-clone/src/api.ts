import { AppState } from "./state/appStateReducer";

/**
 * Takes the current state and sends it to the server to save.
 * @param payload the working App State
 * @returns an awaitable
 */
export const save = (payload: AppState) => {
  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/save`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error while saving the state.");
    }
  });
};

/**
 * Loads the state from the server.
 * @returns an awaitable
 */
export const load = () => {
  // By default fetch() makes GET requests
  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/load`).then(
    (response) => {
      if (response.ok) {
        // Flow lacked this kind of type casting
        return response.json() as Promise<AppState>;
      } else {
        throw new Error("Error while loading the state.");
      }
    },
  );
};
