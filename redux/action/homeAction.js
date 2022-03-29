import axios from 'axios'
import { GAMELIST_REQUEST, GAMELIST_FINISHED, GAMELIST_FAILED } from '../types'

const apiURL = 'https://fsw-challenge-ch11-api-dev.herokuapp.com/api'
// const apiURL = 'http://localhost:8000/api'

const configJSON = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const getGameList = () => async (dispatch) => {
  try {
    dispatch({
      type: GAMELIST_REQUEST,
    })
    const { data } = await axios.get(`${apiURL}/allgame`, configJSON)
    dispatch({
      type: GAMELIST_FINISHED,
      payload: data.data,
    })
    // console.log(data.data)
  } catch (error) {
    dispatch({
      type: GAMELIST_FAILED,
      payload: error,
    })
    // console.log(error.response.data.result)
  }
}

export default {
  getGameList,
}
