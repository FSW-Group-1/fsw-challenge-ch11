import axios from 'axios'
import { GAMEDETAIL_REQUEST, GAMEDETAIL_FINISHED, GAMEDETAIL_FAILED } from '../types'

<<<<<<< HEAD
const apiURL = 'http://localhost:8000/api'
=======
const apiURL = 'https://fsw-challenge-ch11-api-dev.herokuapp.com/api'
// const apiURL = 'http://localhost:8000/api'
>>>>>>> 511ff3cd906991b1e53a629e66cd41ca082c0ff2

const configJSON = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const getGameDetail = (input) => async (dispatch) => {
  try {
    dispatch({
      type: GAMEDETAIL_REQUEST,
    })
    const { data } = await axios.get(`${apiURL}/gamedetail/${input}`, configJSON)
    dispatch({
      type: GAMEDETAIL_FINISHED,
      payload: data.data,
    })
    // console.log(data)
  } catch (error) {
    dispatch({
      type: GAMEDETAIL_FAILED,
      payload: error.response.data.result,
    })
  }
}

export default {
  getGameDetail,
}
