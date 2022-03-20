import { combineReducers } from "redux";
import { authReducer, userReducer } from "./userReducer";
export default combineReducers({
    auth: authReducer,
    // user: userReducer
})