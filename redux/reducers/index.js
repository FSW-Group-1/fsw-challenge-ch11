import { combineReducers } from "redux";
import { authReducer, userReducer } from "./userReducer";
import { homeReducer } from "./homeReducer";
import { gameDetailReducer } from "./gameDetailReducer"

export default combineReducers({
    auth: authReducer,
    gameList: homeReducer,
    gameDetail: gameDetailReducer
    // user: userReducer
})