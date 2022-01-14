import axios from 'axios';
import * as actions from './actions';
import * as actorOperations from '../Actors/operations'
import { createAction, RSAA } from "redux-api-middleware";
import types from "./types";

export const getMovieList = dispatch => () => {
	return dispatch(createAction({
		[RSAA]: {
			endpoint: 'http://localhost:5000/api/movies',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.MOVIE_LIST_REQUEST },
				{
					type: types.MOVIE_LIST_SUCCESS
				},
				{
					type: types.MOVIE_LIST_FAILURE,
				}
			]
		}, onFailure: () => { alert('Nie udało się pobrać danych'); console.log('Nie udało się pobrać filmów') },
		onSuccess: () => { console.log('pobrano listę filmów') }
	}))
}

export const createMovie = dispatch => (newMovie, history) => {

	return dispatch(createAction({
		[RSAA]: {
			endpoint: 'http://localhost:5000/api/movies',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.MOVIE_ADD_REQUEST },
				{
					type: types.MOVIE_ADD_SUCCESS,
				},
				{
					type: types.MOVIE_ADD_FAILURE,
					payload: (action, state, res) => {
						return res
					}
				}
			],
			body: JSON.stringify(newMovie)
		},
		onSuccess: () => { alert('Dodano'); history('/movies/page/1') },
		onFailure: () => { alert('Nie udało się dodać filmu') }
	}))

}

export const deleteMovie = dispatch => (movieToDelete, actors, history) => {
	if (actors.length === 0) {
		return dispatch(
			createAction(
				{
					[RSAA]: {
						endpoint: `http://localhost:5000/api/movies/${movieToDelete.id}`,
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						types: [
							{ type: types.MOVIE_DELETE_REQUEST },
							{
								type: types.MOVIE_DELETE_SUCCESS,
								payload: { 'id': movieToDelete.id }
							},
							{
								type: types.MOVIE_DELETE_FAILURE
							}
						]
					},
					onSuccess: () => { alert('Usunięto'); history('/movies/page/1') },
					onFailure: () => { alert('Nie udało się usunąć filmu') }
				}

			)
		)
	}

	else {

		const actionsArray = actors.map((actor) => {
			return actorOperations.deleteMovieActor(dispatch)(movieToDelete, actor, false)
		})
		//for (let i in actors) {
		//	actorOperations.deleteMovieActor(dispatch)(movieToDelete, actors[i], false)
		//}

		return Promise.all(actionsArray).then(() => {
			return dispatch(
				createAction(
					{
						[RSAA]: {
							endpoint: `http://localhost:5000/api/movies/${movieToDelete.id}`,
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json'
							},
							types: [
								{ type: types.MOVIE_DELETE_REQUEST },
								{
									type: types.MOVIE_DELETE_SUCCESS,
									payload: { 'id': movieToDelete.id }
								},
								{
									type: types.MOVIE_DELETE_FAILURE
								}
							]
						},
						onSuccess: () => { alert('Usunięto'); history('/movies/page/1') },
						onFailure: () => { alert('Nie udało się usunąć filmu') }
					}

				)
			)
		})

	}
}


export const editMovie = dispatch => (modifiedMovie, history) => {
	return dispatch(createAction({
		[RSAA]: {
			endpoint: `http://localhost:5000/api/movies/${modifiedMovie.id}`,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.MOVIE_EDIT_REQUEST },
				{
					type: types.MOVIE_EDIT_SUCCESS,
				},
				{
					type: types.MOVIE_EDIT_FAILURE
				}
			],
			body: JSON.stringify(modifiedMovie)
		},
		onSuccess: () => { alert('Edycja przebiegła pomyślnie'); history(`/movies/${modifiedMovie.id}`) },
		onFailure: () => { alert('Nie udało się zedytować filmu') }
	}))
}


export const editDirector = dispatch => (movie, director_id) => {

	return dispatch(createAction({
		[RSAA]: {
			endpoint: `http://localhost:5000/api/movies/${movie.id}/director`,
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.MOVIE_EDIT_DIRECTOR_REQUEST },
				{
					type: types.MOVIE_EDIT_DIRECTOR_SUCCESS,
					payload: { 'movie': movie.id, 'director': director_id }
				},
				{
					type: types.MOVIE_EDIT_DIRECTOR_FAILURE
				}
			],
			body: JSON.stringify(director_id)
		},
		onSuccess: () => { alert('Zedytowano reżysera') },
		onFailure: () => { alert('Nie udało się zedytować reżysera') }
	}))
}

export const deleteDirector = dispatch => (movie, displayAlert) => {
	return dispatch(createAction({
		[RSAA]: {
			endpoint: `http://localhost:5000/api/movies/${movie.id}/director`,
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.MOVIE_DELETE_DIRECTOR_REQUEST },
				{
					type: types.MOVIE_DELETE_DIRECTOR_SUCCESS,
					payload: movie
				},
				{
					type: types.MOVIE_DELETE_DIRECTOR_FAILURE
				}
			],
			body: '{}'
		},
		onSuccess: displayAlert ? () => { alert('Usunięto rezysera') } : null,
		onFailure: displayAlert ? () => { alert('Nie udało się usunąć reżysera') } : null
	}))
}