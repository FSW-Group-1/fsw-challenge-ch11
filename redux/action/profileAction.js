import axios from 'axios'
import { PROFILE_REQUEST, PROFILE_FINISHED, PROFILE_FAILED, 
        UPDATE_FINISHED, UPDATE_REQUEST, UPDATE_FAILED,
        OTHER_PROFILE_FINISHED, OTHER_PROFILE_REQUEST, OTHER_PROFILE_FAILED 
} from '../types'

// const apiURL = 'https://fsw-challenge-ch10-api-dev.herokuapp.com/api'
const apiURL = 'http://localhost:8000/api'

const configJSON = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const updateUser = (userData) => async (dispatch) => {
  const config = {
    headers: {
      authorization: `${localStorage.getItem('accessToken')}`,
    },
  }
  try {
    dispatch({
      type: UPDATE_REQUEST,
    })
    const { data } = await axios.post(`${apiURL}/me/update`, userData, config)
    dispatch({
      type: UPDATE_FINISHED,
    })
  } catch (error) {}
}

const getProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_REQUEST,
    })
    configJSON.headers['Authorization'] = localStorage.getItem('accessToken')
    const { data } = await axios.get(`${apiURL}/me`, configJSON)
    dispatch({
      type: PROFILE_FINISHED,
      payload: data.data,
    })
    // console.log(data)
  } catch (error) {
    dispatch({
      type: PROFILE_FAILED,
      payload: error.response.data.result,
    })
  }
}



export default {
  getProfile,
  updateUser,
}
