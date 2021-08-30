import axios from 'axios';

// const SET_FRIENDS = 'SET_FRIENDS';

// export const setFriends = (friends) => ({
//   type: SET_FRIENDS,
//   friends,
// });

// export const fetchFriends = (id) => async (dispatch) => {
//   try {
//   const { data } = await axios.get(`/api/users/${id}/friends`);
//   dispatch(setFriends(data));
//   } catch (e) {
//     console.log(e)
//   }
// };

// const initialState = []

// export default function friendsReducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_FRIENDS:
//       return action.friends;
//     default:
//       return state;
//   }
// }
