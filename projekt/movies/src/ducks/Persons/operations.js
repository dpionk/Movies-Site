import axios from 'axios';
import * as actions from './actions';
import * as movieOperations from '../Movies/operations'
import * as actorOperations from '../Actors/operations'
import { createAction, RSAA } from "redux-api-middleware";
import types from "./types";

export const getPersonList = dispatch => () => {
	return dispatch(createAction({
		[RSAA]: {
			endpoint: 'http://localhost:5000/api/persons',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.PERSON_LIST_REQUEST },
				{
					type: types.PERSON_LIST_SUCCESS
				},
				{
					type: types.PERSON_LIST_FAILURE
				}
			]
		}, onFailure: () => { console.log('Nie udało się pobrać osób') },
		onSuccess: () => { console.log('pobrano listę osób') }
	}))
}

export const createPerson = dispatch => (newPerson, history) => {
	return dispatch(createAction({
		[RSAA]: {
			endpoint: 'http://localhost:5000/api/persons',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.PERSON_ADD_REQUEST },
				{
					type: types.PERSON_ADD_SUCCESS,
				},
				{
					type: types.PERSON_ADD_FAILURE
				}
			],
			body: JSON.stringify(newPerson)
		}, onFailure: () => { alert('Nie udało się dodać osoby') },
		onSuccess: () => { alert('Dodano'); history('/persons/page/1') }

	}))
}

export const deletePerson = dispatch => (personToDelete, moviesWhereDirected, moviesWhereActed, history) => {

	if (moviesWhereDirected.length === 0 && moviesWhereActed.length === 0) {
		return dispatch(createAction({
			[RSAA]: {
				endpoint: `http://localhost:5000/api/persons/${personToDelete.id}`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				types: [
					{ type: types.PERSON_DELETE_REQUEST },
					{
						type: types.PERSON_DELETE_SUCCESS,
						payload: { 'id': personToDelete.id }
					},
					{
						type: types.PERSON_DELETE_FAILURE
					}
				]
			}, onFailure: () => { alert('Nie udało się usunąć osoby') },
			onSuccess: () => { alert('Usunięto'); history('/persons/page/1') }
		}
		))
	}

	else {

		const actionsMoviesWhereActed = moviesWhereActed.map((movie) => {
			return actorOperations.deleteMovieActor(dispatch)(movie, personToDelete, false)
		})

		const actionsMoviesWhereDirected = moviesWhereDirected.map((movie) => {
			return movieOperations.deleteDirector(dispatch)(movie, false)
		})

		const actionsArray = [...actionsMoviesWhereActed, actionsMoviesWhereDirected]
		//for (let i in moviesWhereActed) {
		//	actorOperations.deleteMovieActor(dispatch)(moviesWhereActed[i], personToDelete, false)
		//}
		//for (let i in moviesWhereDirected) {
		//	movieOperations.deleteDirector(dispatch)(moviesWhereDirected[i], false)
		//}
		return Promise.all(actionsArray).then(dispatch(
			createAction(
				{
					[RSAA]: {
						endpoint: `http://localhost:5000/api/persons/${personToDelete.id}`,
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						types: [
							{ type: types.PERSON_DELETE_REQUEST },
							{
								type: types.PERSON_DELETE_SUCCESS,
								payload: { 'id': personToDelete.id }
							},
							{
								type: types.PERSON_DELETE_FAILURE
							}
						]
					},
					onSuccess: () => { alert('Usunięto'); history('/persons/page/1') },
					onFailure: () => { alert('Nie udało się usunąć osoby') }
				}
			)
		)
		)
	}
}


export const editPerson = dispatch => (modifiedPerson, history) => {
	return dispatch(createAction({
		[RSAA]: {
			endpoint: `http://localhost:5000/api/persons/${modifiedPerson.id}`,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			types: [
				{ type: types.PERSON_EDIT_REQUEST },
				{
					type: types.PERSON_EDIT_SUCCESS,
				},
				{
					type: types.PERSON_EDIT_FAILURE
				}
			],
			body: JSON.stringify(modifiedPerson)
		}
		, onFailure: () => { alert('Nie udało się zedytować osoby') },
		onSuccess: () => { alert('Edycja przebiegła pomyślnie'); history(`/persons/${modifiedPerson.id}`) }
	}

	))
}
