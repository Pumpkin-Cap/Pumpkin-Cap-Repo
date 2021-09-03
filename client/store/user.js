import axios from "axios"
import TOKEN from './auth'

//// action types
const SET_USER = "SET_USER"

const SET_FRIENDS = 'SET_FRIENDS';


/// action creators

const setUser = user => ( {type: SET_USER, user} )

const setFriends = (friends) => ({
    type: SET_FRIENDS,
    friends,
  });

// thunks

export const fetchUser = (id) => async dispatch => {

    try {
        const token = window.localStorage.getItem('token');
        const { data } = await axios.get(`/api/users/${id}`, { headers: { authorization: token } });
        console.log("SET USER IN FETCH USER")
        dispatch(setUser(data))
        return data;
    } catch (userError) {
        console.log("COULD NOT GET USER ", userError)
    }
}

export const updateUser = (id, newName, newPass) => async dispatch => {
    try {
        const token = window.localStorage.getItem('token')
        console.log(token)
        const { data } = await axios.put(`/api/users/update/${id}`,{username: newName, password: newPass}, { headers: { authorization: token } });
        console.log("SET USER IN THE UPDATE USER")
        dispatch(setUser(data))
    } catch (err) {
        console.log('THERE WAS A PROBLEM UPDATING THE USER: ', err)
    }
}

export const verifyUser = (id, enteredPass) => async () =>{
    try{
        const token = window.localStorage.getItem('token')
        const { data } = await axios.get(`/api/users/verify/${id}`, { headers: { authorization: token, check: enteredPass } });

        if (data){ return true; }
        return false;
    }catch(err){
        console.log('THERE WAS A PROBLEM VERIFYING THE USER: ', err)
    }
}

export const fetchFriends = (user) => async (dispatch) => {
    try {
        const token = window.localStorage.getItem('token');
        // const user = await axios.get(`/api/users/${id}`, { headers: { authorization: token } });
        const budArray = await axios.get(`/api/users/${user.id}/friends`, { headers: { authorization: token } });
        console.log('user: ', user)
        // user.data.friends = budArray.data;
        console.log('friends: ', budArray.data)
        dispatch(setFriends(budArray.data));
    } catch (e) {
      console.log(e)
    }
  };

// reducer

export default function( state = {}, action ) {
    switch (action.type) {
        case SET_USER:
            return action.user;
        case SET_FRIENDS:
            return {...user, friends: action.friends }
        default:
            return state
    }
}
