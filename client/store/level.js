import axios from 'axios';
import { TOKEN } from './auth';
import { changeCode } from './code'

//action types

const SET_LEVEL = 'SET_LEVEL';

// action creators

const setLevel = (level) => ({
	type: SET_LEVEL,
	level,
});

// thunks

export const fetchLevel = (id) => async (dispatch) => {
	try {
		const token = window.localStorage.getItem(TOKEN);
		const { data } = await axios.get(`/api/level/${id}`, {
			headers: { authorization: token },
		});
		dispatch(setLevel(data));
		return true;
	} catch (levelError) {
		console.log('THERE WAS A PROBLEM GETTING THE LEVEL!!! ', levelError);
		return false;
	}
};

export const fetchLevels = () => async (dispatch) => {
	try {
		const token = window.localStorage.getItem(TOKEN);
		const { data } = await axios.get(`/api/level/list`, {
			headers: { authorization: token },
		});
		dispatch(setLevel(data));
	} catch (levelError) {
		console.log('Could not get all levels', levelError);
	}
};

export const nextLevel = (id) => async (dispatch) => {
	try {
		const token = window.localStorage.getItem(TOKEN);

		const nextId = parseInt(id) + 1;
		if (nextId > 17){
			window.location.replace('/theWinPage');
		}else{
			const { data } = await axios.get(`/api/level/complete/${id}`, {
				headers: { authorization: token },
			});
			dispatch(setLevel(data));
			return data;
		}
	} catch (levelError) {
		console.log('These are not the ducks you are looking for', levelError);
	}
};
// reducer

export default function (state = {}, action) {
	switch (action.type) {
		case SET_LEVEL:
			return action.level;
		default:
			return state;
	}
}
