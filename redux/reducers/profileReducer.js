import {
    UPDATE_FINISHED, UPDATE_REQUEST, UPDATE_FAILED,
    PROFILE_REQUEST, PROFILE_FAILED, PROFILE_FINISHED, 
    OTHER_PROFILE_FINISHED, OTHER_PROFILE_REQUEST, OTHER_PROFILE_FAILED,
    ALL_USER_FAILED, ALL_USER_FINISHED, ALL_USER_REQUEST

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
        
        case OTHER_PROFILE_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        
        case OTHER_PROFILE_FINISHED:
            return{
                ...state,
                data: action.payload,
                isLoading: false
            }
        
        case OTHER_PROFILE_FAILED:
            return{
                ...state,
                error: action.payload
            }
        case ALL_USER_REQUEST:
            return{
                ...state,
                isLoading: true
            }
    
        case ALL_USER_FINISHED:
            return{
                ...state,
                data: action.payload,
                isLoading: false
            }

        case ALL_USER_FAILED:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}