import axios from "axios"

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


// reducer

export default function( state = {}, action ) {
    switch (action.type) {
        case SET_USER:
            return action.user
        default:
            return state
    }
}
