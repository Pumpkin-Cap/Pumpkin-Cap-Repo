import axios from 'axios';
import { TOKEN } from './auth';

//action types

const SET_TUTORIAL = 'SET_TUTORIAL';

// action creators

const setTutorial = (tutorial) => ({
	type: SET_TUTORIAL,
	tutorial,
});

// thunks

export const fetchTutorial = (id) => async (dispatch) => {
	try {
		const token = window.localStorage.getItem(TOKEN);
		const queryString = window.location.search;
		const { data } = await axios.get(`/api/level/tutorial/${id}/${queryString}`, {
			headers: { authorization: token },
		});
		dispatch(setTutorial(data));
		return true;
	} catch (levelError) {
		console.log('THERE WAS A PROBLEM GETTING THE TUTORIAL!!! ', levelError);
		return false;
	}
};

export const fetchTutorials = () => async (dispatch) => {
	try {
		const token = window.localStorage.getItem(TOKEN);
		const { data } = await axios.get(`/api/level/list`, {
			headers: { authorization: token },
		});
		dispatch(setTutorial(data));
	} catch (levelError) {
		console.log('Could not get all Tutorials', levelError);
	}
};

export const nextLevel = (id) => async (dispatch) => {
	try {
		const token = window.localStorage.getItem(TOKEN);
		const { data } = await axios.get(`/api/level/complete/tutorial/${id}`, {
			headers: { authorization: token },
		});
		dispatch(setTutorial(data));
		return data;
	} catch (levelError) {
		console.log('These are not the ducks you are looking for', levelError);
	}
};
// reducer

export default function (state = {}, action) {
	switch (action.type) {
		case SET_TUTORIAL:
			return action.tutorial;
		default:
			return state;
	}
}
