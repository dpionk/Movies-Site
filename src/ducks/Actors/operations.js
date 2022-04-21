import { createAction, RSAA } from "redux-api-middleware";
import types from "./types";


export const getActorList = dispatch => () => {
	return dispatch(createAction({
		[RSAA]: {
			endpoint: 'http://localhost:5000/api/actors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.ACTOR_LIST_REQUEST },
				{
					type: types.ACTOR_LIST_SUCCESS
				},
				{
					type: types.ACTOR_LIST_FAILURE
				}
			]
		}, onFailure: () => { console.log('Nie udało się pobrać aktorów') },
		onSuccess: () => { console.log('pobrano listę aktorów') }
	}))
}



export const createActor = dispatch => (movie, actor) => {
	return dispatch(createAction({
		[RSAA]: {
			endpoint: `http://localhost:5000/api/movies/${movie.id}/actors`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.ACTOR_ADD_REQUEST },
				{
					type: types.ACTOR_ADD_SUCCESS,
				},
				{
					type: types.ACTOR_ADD_FAILURE
				}
			],
			body: JSON.stringify({ "id": actor.id })
		}, onFailure: () => { alert('Nie udało się dodać aktora') },
		onSuccess: () => { alert('dodano aktora') }
	}))
}


export const deleteMovieActor = dispatch => (movie, actor, displayAlert) => {
	return dispatch(createAction({
		[RSAA]: {
			endpoint: `http://localhost:5000/api/movies/${movie.id}/actors/${actor.id}`,
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.ACTOR_DELETE_REQUEST },
				{
					type: types.ACTOR_DELETE_SUCCESS,
					payload: { 'movie': movie, 'actor': actor }
				},
				{
					type: types.ACTOR_DELETE_FAILURE
				}
			]
		}, onFailure: displayAlert ?  () => { alert('Nie udało się usunąć aktora') } : null,
		onSuccess: displayAlert ? () => { alert('usunięto aktora') } : null 

	})
	)
}