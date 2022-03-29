import {
    UPDATE_FINISHED, UPDATE_REQUEST, UPDATE_FAILED,
    PROFILE_REQUEST, PROFILE_FAILED, PROFILE_FINISHED, 
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
        case UPDATE_REQUEST:
            return{
                ...state,
                isLoading: true
            }
            
        case UPDATE_FINISHED:
            return{
                ...state,
                isLoading: false
            }
            
        case UPDATE_FAILED:
            return{
                ...state,
                error: action.payload
            }
        
        default:
            return state
    }
}