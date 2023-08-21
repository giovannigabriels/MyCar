import { CARS_FETCH, MY_CARS_FETCH } from "./actionTypes";

const urlBase = "http://localhost:3000";

export const carsFetch = (payload) => {
  return {
    type: CARS_FETCH,
    payload,
  };
};

export const myCarsFetch = (payload) => {
  return {
    type: MY_CARS_FETCH,
    payload,
  };
};

export const fetchCars = () => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/car/pub`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
};

export const fetchMyCars = () => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/car/my-car`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(myCarsFetch(data));
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
};

export const fetchOneCars = (id) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/car/pub/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };
};
