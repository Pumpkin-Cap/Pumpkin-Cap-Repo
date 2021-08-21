import axios from "axios"
import { TOKEN } from "./auth"

//action types

const SET_LEVEL = 'SET_LEVEL'



// action creators

const setLevel = level => ({
    type: SET_LEVEL,
    level
})


// thunks

export const fetchLevel = (id) => async dispatch => {
    try {
      const { data } = await axios.get(`/api/level/${id}`)
      dispatch(setLevel(data))
    } catch (levelError) {
      console.log("THERE WAS A PROBLEM GETTING THE LEVEL!!! ", levelError )
    }
  }

export const fetchLevels = () => async dispatch => {
  try {
    const token = window.localStorage.getItem(TOKEN)
    const queryString = window.location.search;
    console.log(queryString);
    const { data } = await axios.get(`/api/level/list${queryString}`, {
      headers: {
        authorization: token
      }
    })
    console.log("LEVELS:  ", data)
    dispatch(setLevel(data))
  } catch (levelError) {
    console.log("Could not get completed levels", levelError )
  }
}
// reducer


export default function(state = {}, action) {
    switch (action.type) {
      case SET_LEVEL:
        return action.level
      default:
        return state
    }
  }