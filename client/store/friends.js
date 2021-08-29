import axios from 'axios';

const SET_FRIENDS = 'SET_FRIENDS';

export const setFriends = (friends) => ({
  type: SET_FRIENDS,
  friends,
});

export const fetchFriends = () => async (dispatch) => {
  try {
  const { data } = await axios.get('/api/friends');
  dispatch(setFriends(data));
  } catch (e) {
    console.log(e)
  }
};

const initialState = []

export default function friendssReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FRIENDS:
      return action.friends;
    default:
      return state;
  }
}
