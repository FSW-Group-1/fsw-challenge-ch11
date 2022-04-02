import { 
    REQUEST_FINISHED, REQUEST_LOADING, GET_REQUEST,
    LOGIN_FINISHED, LOGIN_REQUEST, LOGIN_FAILED, 
    REGISTER_FINISHED, REGISTER_REQUEST, REGISTER_FAILED,
    UPDATE_FINISHED, UPDATE_REQUEST, UPDATE_FAILED,
    LOG_OUT, LOG_IN, AUTH_RESET
     } from "../types";

// const initialState = [{
//     user: []
// }]

export const authReducer = (state = {}, action) =>{
    switch(action.type){
        case LOGIN_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        
        case LOGIN_FINISHED:
            return{
                ...state,
                auth: action.payload,
                isLoading: false,
                loggedIn: true
            }
        
        case LOGIN_FAILED:
            return{
                ...state,
                isLoading: false,
                error: action.payload
            }
        case AUTH_RESET:
            return{
                ...state,
                isLoading: false,
                auth: null,
                error: null
            }
        case LOG_IN:
            return{
                ...state,
                loggedIn: true
            }

        case LOG_OUT:
            return{
                ...state,
                loggedIn: false
            }

        case REGISTER_REQUEST:
            return{
                ...state,
                isLoading: true,
            }
        
        case REGISTER_FINISHED:
            return{
                ...state,
                isLoading: false,
                auth: action.payload,
            }
        
        case REGISTER_FAILED:
            return{
                ...state,
                isLoading: false,
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

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        
    }
}