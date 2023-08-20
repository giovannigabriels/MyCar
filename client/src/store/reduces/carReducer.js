import {
    CARS_FETCH,
    ONE_CAR_FETCH
  } from "../actions/actionTypes";
  
  const initialState = {
    cars: [],
    oneCar: {},
  };
  
  function carReducer(state = initialState, action) {
    switch (action.type) {
      case ONE_CAR_FETCH:
        return { ...state, oneCar: action.payload };
      case CARS_FETCH:
        return { ...state, cars: action.payload };
      default:
        return state;
    }
  }
  
  export default carReducer;
  