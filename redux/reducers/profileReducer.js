import {
    PROFILE_REQUEST, PROFILE_FAILED, PROFILE_FINISHED
} from "../types"

export const profileReducer = (state = {isLoading: true}, action) => {
    switch(action.type){
        case PROFILE_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case PROFILE_FINISHED:
            return{
                ...state,
                data: action.payload,
                isLoading: false
            }
        case PROFILE_FAILED:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}