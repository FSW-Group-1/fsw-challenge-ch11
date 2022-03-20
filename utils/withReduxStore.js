import React from "react";
import {initializeStore} from '../redux'

const isServer = typeof window === 'undefined'
const _NEXT_REDUX_STORE_ = '_NEXT_REDUX_STORE_'

function getOrCreateStore(initialState){
    //Always make a new store if server, otherwise state is shared between request
    if(isServer){
        return initializeStore(initialState)
    }

    //create store  if unavailable on the client and set it on the window object
    if(!window[_NEXT_REDUX_STORE_]){
        window[_NEXT_REDUX_STORE_] = initializeStore(initialState)
    }
    return window[_NEXT_REDUX_STORE_]
}

export default App =>{
    return class AppWithRedux extends React.Component{
        static async getInitialProps (appContext){
            //get or create the store with 'undefined' as initialstate
            //This allows you to set a custom default initialState
            const reduxStore = getOrCreateStore();

            //Provide the store is to get getInitialProps of pages
            appContext.ctx.reduxStore = reduxStore

            let appProps = {}
            if (typeof App.getInitialProps === 'function'){
                appProps = await App.getInitialProps(appContext)
            }

            return{
                ...appProps,
                initialReduxState: reduxStore.getState()
            }
        }

        constructor(props){
            super(props)
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }

        render(){
            return <App {...this.props} reduxStore={this.reduxStore} />
        }
    }
}