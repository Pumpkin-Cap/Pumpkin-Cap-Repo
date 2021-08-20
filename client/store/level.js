import axios from "axios"


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

// reducer


export default function(state = {}, action) {
    switch (action.type) {
      case SET_LEVEL:
        return action.level
      default:
        return state
    }
  }
