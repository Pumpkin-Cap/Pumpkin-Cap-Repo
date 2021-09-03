import axios from "axios"
import TOKEN from './auth'

//// action types
const GET_ALL_USERS = "GET_ALL_USERS"

/// action creators

const getAllUsers = (users) => ( {type: GET_ALL_USERS, users} )

// thunks

export const fetchAllUsers = () => async dispatch => {
    try {
        const token = window.localStorage.getItem('token');
        const { data } = await axios.get(`/api/users`, { headers: { authorization: token } });
        dispatch(getAllUsers(data))
    } catch (userError) {
        console.log("COULD NOT GET ALL USERS ", userError)
    }
}

// reducer

export default function( state = [], action ) {
    switch (action.type) {
        case GET_ALL_USERS:
            return action.users;
        default:
            return state
    }
}
