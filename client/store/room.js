// import axios from 'axios'

/**
 * ACTION TYPES
 */
 const SET_ROOM = 'SET_ROOM'

 /**
  * ACTION CREATORS
  */
 export const setRoom = room => ({type: SET_ROOM, room})
 
 /**
  * THUNK CREATORS
  */
 export const updateRoom = (room) => async dispatch => {
     return dispatch(setRoom(room))
 }
 
 
 /**
  * REDUCER
  */
 export default function(state = {roomName: '', users: []}, action) {
   switch (action.type) {
     case SET_ROOM:
       return action.room
     default:
       return state
   }
 }