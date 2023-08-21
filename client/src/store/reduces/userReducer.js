import {
  USER_LOGIN,
} from "../actions/actionTypes";

const initialState = {
  isLogin: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
}

export default userReducer;
