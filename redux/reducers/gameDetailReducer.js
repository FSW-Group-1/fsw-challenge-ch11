import {
    GAMEDETAIL_REQUEST, GAMEDETAIL_FAILED, GAMEDETAIL_FINISHED
} from "../types"

export const gameDetailReducer = (state = {isLoading: true}, action) => {
    switch(action.type){
        case GAMEDETAIL_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case GAMEDETAIL_FINISHED:
            return{
                ...state,
                data: action.payload,
                isLoading: false
            }
        case GAMEDETAIL_FAILED:
            return{
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}