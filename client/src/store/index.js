import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  // carReducer,
  // carCommentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
