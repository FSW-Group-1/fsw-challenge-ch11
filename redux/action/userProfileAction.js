import axios from 'axios'
import {
    USERPROFILE_REQUEST, USERPROFILE_FINISHED, USERPROFILE_FAILED
} from "../types"

const apiURL = 'https://fsw-challenge-ch10-api-dev.herokuapp.com/api'
const configJSON = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const getUserProfile = (id) => async(dispatch) => {
    try {
        dispatch({
            type: USERPROFILE_REQUEST,
        })
        configJSON.headers['Authorization'] = localStorage.getItem('accessToken');
        const { data } = await axios.get(`${apiURL}/user/${id}`, configJSON)
        dispatch({
            type: USERPROFILE_FINISHED,
            payload: data.data
        })
        // console.log(data)
    } catch (error) {
        dispatch({
            type: USERPROFILE_FAILED,
            payload: error.response.data.result
        })
    }
}


export default {
    getUserProfile
}