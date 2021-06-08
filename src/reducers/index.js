import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reposReducer from "./reposReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import thunk from "redux-thunk";
import addPostReducer from "./addPostReducer";

const rootReducer = combineReducers({
  repos: reposReducer,
  auth: authReducer,
  user: userReducer,
  addPost: addPostReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
