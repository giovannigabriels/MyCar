import {
    CAR_COMMENTS_FETCH,
    INPUT_CAR_COMMENTS
  } from "../actions/actionTypes";
  
  const initialState = {
    carComment: [],
    inputCar:null
  };
  
  function carCommentReducer(state = initialState, action) {
    switch (action.type) {
      case CAR_COMMENTS_FETCH:
        return { ...state, carComment: action.payload };
      case INPUT_CAR_COMMENTS:
        return { ...state, inputCar: action.payload };
      default:
        return state;
    }
  }
  
  export default carCommentReducer;
  