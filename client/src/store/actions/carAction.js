

import {
    CARS_FETCH,
  } from "./actionTypes";
  

  const urlBase = "http://localhost:3000";
  
  export const carsFetch = (payload) => {
    return {
      type: CARS_FETCH,
      payload,
    };
  };
  
//   export const oneItemFetch = (payload) => {
//     return {
//       type: ONE_ITEM_FETCH,
//       payload,
//     };
//   };
  
  
  export const fetchCars= () => {
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
  
  export const fetchOneItem = (id) => {
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
  