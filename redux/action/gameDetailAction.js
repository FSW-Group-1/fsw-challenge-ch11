import axios from 'axios'
import { GAMEDETAIL_REQUEST, GAMEDETAIL_FINISHED, GAMEDETAIL_FAILED } from '../types'

const apiURL = 'http://localhost:8000/api'

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
