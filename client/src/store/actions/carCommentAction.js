

import {
    CAR_COMMENTS_FETCH,
    INPUT_CAR_COMMENTS
  } from "./actionTypes";
  

  const urlBase = "http://localhost:3000";
  
  export const carCommentFetch = (payload) => {
    return {
      type:CAR_COMMENTS_FETCH,
      payload,
    };
  };
  
  
  export const fetchCarComment= (id) => {
    return (dispatch, getState) => {
      return fetch(`${urlBase}/car-comment/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          return response.json();
        })
        .then((data)=>{
            dispatch(carCommentFetch(data))
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
      return fetch(`${urlBase}/car/${id}`)
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
  