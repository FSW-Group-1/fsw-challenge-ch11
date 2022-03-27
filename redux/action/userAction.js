import axios from "axios";
import { 
    REQUEST_FINISHED, REQUEST_LOADING, GET_REQUEST,
    LOGIN_FINISHED, LOGIN_REQUEST, LOGIN_FAILED, 
    REGISTER_FINISHED, REGISTER_REQUEST, REGISTER_FAILED,
    UPDATE_FINISHED, UPDATE_REQUEST, UPDATE_FAILED,
    LOG_OUT, LOG_IN
     } from "../types";

// const accessToken = localStorage.getItem('accessToken')
// const apiURL = 'https://fsw-challenge-ch10-api-dev.herokuapp.com/api'
const apiURL = 'http://localhost:8000/api'

const configJSON = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const registerUser = (dataUser) => async (dispatch) =>{
    try {
        dispatch({
            type: REGISTER_REQUEST,
        })
        const { data } = await axios.post(`${apiURL}/register`, dataUser, configJSON);
        dispatch({
            type: REGISTER_FINISHED,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAILED,
            payload: error.response.data.result
        })
        console.log(error.response.data.result)
    }
}


const loginUser = (dataUser) => async dispatch => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const{ data } = await axios.post(`${apiURL}/login`, dataUser, configJSON)
        console.log(data.message)
        //set localStorage here
        localStorage.setItem('accessToken', data.data.accessToken)
        dispatch({
            type: LOGIN_FINISHED,
            payload: data.message
        })

        // console.log('finished')
    } catch (error) {
        dispatch({
            type: LOGIN_FAILED,
            payload: error.response.data.result
        })
        console.log(error.response.data.result)
    }
}



const logOut = () => async (dispatch) =>{
    console.log('Logged OUT')
    localStorage.removeItem('accessToken')
    dispatch({
        type: LOG_OUT
    })
}

const checkTokenValid = () => async (dispatch) => {
    // console.log('checking Token')
    const config = {
        headers: {
            authorization: `${localStorage.getItem('accessToken')}`,
        },
    }
    // console.log(localStorage.getItem('accessToken'))
    if(localStorage.getItem('accessToken') != null){
        const result = await axios.get(`${apiURL}/verifytoken`, config)
                            .catch(error => {
                                console.log(error.response)
                                dispatch(logOut())
                            })
        // console.log(result.data)
        if(result != null){
            if(result.data.err == null){
                 // console.log('Dispatching Log In')
                 dispatch({
                     type: LOG_IN,
                 })
             }else{
                dispatch(logOut())
             }
        }
    }else{
        dispatch({
            type: LOG_OUT
        })
    }
}

const updateUser = (userData) => async (dispatch) => {
    const config = {
        headers: {
            authorization: `${localStorage.getItem('accessToken')}`,
        },
    }
    try {
        dispatch({
            type: UPDATE_REQUEST
        })
        const{ data } = await axios.post(`${apiURL}/me/update`, userData, config)
        dispatch({
            type: UPDATE_FINISHED,
        })
    } catch (error) {
        
    }
}

const updateScore = (userData) => async (dispatch) => {
    const config = {
        headers: {
            authorization: `${localStorage.getItem('accessToken')}`,
        },
    }

    try {
        dispatch({
            type: UPDATE_REQUEST
        })
        const{ data } = await axios.post(`${apiURL}/score`, userData, config)
        dispatch({
            type: UPDATE_FINISHED
        })
    } catch (error) {
        
    }
}

export default {
    registerUser,
    loginUser,
    logOut,
    checkTokenValid,
    updateUser,
    updateScore,
}