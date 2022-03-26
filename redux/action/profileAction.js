import axios from 'axios'
import {
    PROFILE_REQUEST, PROFILE_FINISHED, PROFILE_FAILED
} from "../types"

const apiURL = 'https://fsw-challenge-ch10-api-dev.herokuapp.com/api'
const configJSON = {
    headers: {
        'Content-Type': 'application/json'
        // 'Authorization': `${localStorage.getItem('accessToken')}`
    }
}

const getProfile = () => async(dispatch) => {
    try {
        dispatch({
            type: PROFILE_REQUEST,
        })
        configJSON.headers['Authorization'] = localStorage.getItem('accessToken');
        const { data } = await axios.get(`${apiURL}/me`, configJSON)
        dispatch({
            type: PROFILE_FINISHED,
            payload: data.data
        })
        // console.log(data)
    } catch (error) {
        dispatch({
            type: PROFILE_FAILED,
            payload: error.response.data.result
        })
    }
}

export default {
    getProfile
}