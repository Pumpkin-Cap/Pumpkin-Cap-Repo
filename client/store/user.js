import axios from "axios"
import TOKEN from './auth'

//// action types
const SET_USER = "SET_USER"


/// action creators

const setUser = user => ( {type: SET_USER, user} )

// thunks

export const fetchUser = (id) => async dispatch => {

    try {
        const { data } = await axios.get(`/api/users/${id}`)
        dispatch(setUser(data))
    } catch (userError) {
        console.log("COULD NOT GET USER ", userError)
    }

}

export const updateUser = (id, username, password) => async dispatch => {
    try {
        const token = window.localStorage.getItem('token')
        console.log(token)
        const { data } = await axios.put(`/api/users/update/${id}`, {
            username,
            password,
            headers: {
              authorization: token
            }
          })
        dispatch(setUser(data))
    } catch (err) {
        console.log('THERE WAS A PROBLEM UPDATING THE USER: ', err)
    }
}


// reducer

export default function( state = {}, action ) {
    switch (action.type) {
        case SET_USER:
            return action.user
        default:
            return state
    }
}
