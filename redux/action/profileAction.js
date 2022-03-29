import axios from 'axios'
import { PROFILE_REQUEST, PROFILE_FINISHED, PROFILE_FAILED, 
        UPDATE_FINISHED, UPDATE_REQUEST, UPDATE_FAILED,
        OTHER_PROFILE_FINISHED, OTHER_PROFILE_REQUEST, OTHER_PROFILE_FAILED,
        ALL_USER_FAILED, ALL_USER_FINISHED, ALL_USER_REQUEST
} from '../types'

// const apiURL = process.env.API_URL
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

const getOtherUser = (id) => async(dispatch) => {
  try {
    dispatch({
      type: OTHER_PROFILE_REQUEST
    })
    const { data } = await axios.get(`${apiURL}/user/${id}`)

    dispatch({
      type: OTHER_PROFILE_FINISHED,
      payload: data.data
    })
  } catch (error) {
    
  }
}

const getAllUser = () => async(dispatch) => {
  try {
    dispatch({
      type: ALL_USER_REQUEST
    })

    const { data } = await axios.get(`${apiURL}/users`)
    
    dispatch({
      type: ALL_USER_FINISHED,
      payload: data.data
    })
  } catch (error) {
    dispatch({
      type: ALL_USER_FAILED,
      payload: error.response
    })
  }
}

export default {
  getProfile,
  updateUser,
  getOtherUser,
  getAllUser
}
