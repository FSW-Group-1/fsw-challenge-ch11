import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import reducers from './reducers'

const initialState = {
    loading: false,
}

const store = createStore(
    reducers, 
    initialState, 
    composeWithDevTools(applyMiddleware(thunk))
)

function initializeStore (initialState ={}){
    return store
}

export{
    store,
    initializeStore
}