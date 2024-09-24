import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  isAuthenticate: authReducer,
});

export default rootReducer;