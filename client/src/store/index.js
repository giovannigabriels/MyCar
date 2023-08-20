import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import carCommentReducer from "./reduces/carCommetReducer";
import carReducer from "./reduces/carReducer";

const rootReducer = combineReducers({
  carReducer,
  carCommentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
