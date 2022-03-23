import { combineReducers } from "redux";
import { authReducer, userReducer } from "./userReducer";
import { homeReducer } from "./homeReducer";

export default combineReducers({
    auth: authReducer,
    gameList: homeReducer
    // user: userReducer
})