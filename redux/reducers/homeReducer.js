import { 
    GAMELIST_REQUEST, GAMELIST_FINISHED, GAMELIST_FAILED 
     } from "../types";

// const initialState = [{
//     user: []
// }]

export const homeReducer = (state = {}, action) =>{
    switch(action.type){
        case GAMELIST_REQUEST:
            return{
                ...state,
                // data: action.payload,
                isLoading: true
            }
        case GAMELIST_FINISHED:
            return{
                ...state,
                data: action.payload,
                isLoading: false
            }
        case GAMELIST_FAILED:
            return{
                ...state,
                error: action.payload
            }
                
        default:
            return state 
    }
}