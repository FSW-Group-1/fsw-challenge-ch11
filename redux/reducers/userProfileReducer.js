import {
    USERPROFILE_REQUEST, USERPROFILE_FAILED, USERPROFILE_FINISHED
} from "../types"

export const profileReducer = (state = {isLoading: true}, action) => {
    switch(action.type){
        case USERPROFILE_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case USERPROFILE_FINISHED:
            return{
                ...state,
                data: action.payload,
                isLoading: false
            }
        case USERPROFILE_FAILED:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}