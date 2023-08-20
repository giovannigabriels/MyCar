import { CAR_COMMENTS_FETCH} from "./actionTypes";

const urlBase = "http://localhost:3000";

export const carCommentFetch = (payload) => {
  return {
    type: CAR_COMMENTS_FETCH,
    payload,
  };
};

export const fetchCarComment = (id) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/car-comment/${id}`)
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

export const addCarComment = (payload) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/car-comment`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    });
  };
};
