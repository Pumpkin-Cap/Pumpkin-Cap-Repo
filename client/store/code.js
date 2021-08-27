// import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CODE = 'SET_CODE'

/**
 * ACTION CREATORS
 */
export const setCode = code => ({type: SET_CODE, code})

/**
 * THUNK CREATORS
 */
export const changeCode = (code) => async dispatch => {
    return dispatch(setCode(code))
}


/**
 * REDUCER
 */
export default function(state = '', action) {
  switch (action.type) {
    case SET_CODE:
      return action.code
    default:
      return state
  }
}
