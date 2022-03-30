import { combineReducers } from "redux";
import { authReducer, userReducer } from "./userReducer";
import { homeReducer } from "./homeReducer";
import { gameDetailReducer } from "./gameDetailReducer"
import { profileReducer } from "./profileReducer"

export default combineReducers({
    auth: authReducer,
    gameList: homeReducer,
    gameDetail: gameDetailReducer,
    profile: profileReducer
    // user: userReducer
})