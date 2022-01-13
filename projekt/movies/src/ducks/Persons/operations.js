import axios from 'axios';
import * as actions from './actions';
import * as movieActions from '../Movies/actions'
import * as actorActions from '../Actors/actions'
import { createAction, RSAA  } from "redux-api-middleware";
import types from "./types";

//export const getPersonList = (setLoading) => {
//	return async dispatch => {
//		setLoading(true);
//            axios.get('http://localhost:5000/api/persons').then((response) => {
//				dispatch(actions.personListAction(response.data));
//			}).catch(() => {
//				alert('Nie udało się pobrać osób')
//			}).finally(() => {
//				setLoading(false);
//			})
//    }
//}


export const getPersonList = dispatch => () => {
	return dispatch( createAction({
		[RSAA] : {
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
			{ type: types.PERSON_LIST_FAILURE
			} 
		]
	},onFailure: () => {console.log('Nie udało się pobrać osób')},
	onSuccess: () => {console.log('pobrano listę osób')}
	}))
 }
//export const createPerson = (newPerson, setPending, setError) => {
//	return async dispatch => {
//		setPending(true)
//            axios.post('http://localhost:5000/api/persons', newPerson).then((response) => {
//				dispatch(actions.personCreateAction(response.data));
//				alert('Dodano')
//			}).catch(() => {
//				setError(true)
//				alert("Brak połączenia z bazą danych")
//			}).finally(() => {
//				setPending(false)
//			})
//    }
//}

export const createPerson = dispatch => (newPerson, history) => {
	return dispatch (createAction({
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
			{ type: types.PERSON_ADD_FAILURE
			} 
		],
		body: JSON.stringify(newPerson)
	},onFailure: () => {alert('Nie udało się dodać osoby')},
	onSuccess: () => {alert('Dodano'); history('/persons/page/1')}

	}))
}

export const deletePerson = dispatch => (personToDelete, moviesWhereDirected, moviesWhereActed, history) => {

	if (moviesWhereDirected.length === 0 && moviesWhereActed.length === 0) {
	return dispatch ( createAction ({
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
				  payload: { 'id' : personToDelete.id }
				},
				{ type: types.PERSON_DELETE_FAILURE
				} 
			]
		},onFailure: () => {alert('Nie udało się usunąć osoby')},
		onSuccess: () => {alert('Usunięto'); history('/persons/page/1')}
	}

	))


//	{
//		axios.delete(`http://localhost:5000/api/persons/${personToDelete.id}`).then(() => {
//			dispatch(actions.personDeleteAction(personToDelete));
//			alert('Usunięto')
//		}).catch((error) => {
//			console.log(error)
//		})		
//}
	}
	else {
		let promiseArray = moviesWhereDirected.map((movie) => {
			return (axios.patch(`http://localhost:5000/api/movies/${movie.id}/director`))
		})
		let promiseArray2 = moviesWhereActed.map((movie) => {
			return (axios.delete(`http://localhost:5000/api/movies/${movie.id}/actors/${personToDelete.id}`))
		})
		promiseArray = [...promiseArray, ...promiseArray2, axios.delete(`http://localhost:5000/api/persons/${personToDelete.id}`)]
		return async dispatch => {
			Promise.all(promiseArray).then(() => {
				for (let i  in moviesWhereDirected) {
					dispatch(movieActions.movieEditDirectorAction(moviesWhereDirected[i], { "id":null }));
				}
				for (let i  in moviesWhereActed) {
					dispatch(actorActions.actorDeleteAction(personToDelete, moviesWhereActed[i]));
				}
				dispatch(actions.personDeleteAction(personToDelete));
				alert('Usunięto')
			}).catch((error) => {
				console.log(error)
			})		
    }
		
	}
}

//export const editPerson = (modifiedPerson, setPending, setError) => {
//	return async dispatch => {
//		setPending(true);
//		axios.put(`http://localhost:5000/api/persons/${modifiedPerson.id}`, modifiedPerson).then((response) => {
//			dispatch(actions.personEditAction(response.data))
//			alert("Edycja przebiegła pomyślnie")
//		}).catch(() => {
//			setError(true);
//			alert("Brak połączenia z bazą danych")
//		}).finally(() => {
//			setPending(false);
//		})
//	}
//}

export const editPerson = dispatch => (modifiedPerson, history) => {
	return dispatch (createAction({
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
			{ type: types.PERSON_EDIT_FAILURE
			} 
		],
		body: JSON.stringify(modifiedPerson)
	}
	,onFailure: () => {alert('Nie udało się zedytować osoby')},
	onSuccess: () => {alert('Edycja przebiegła pomyślnie'); history(`/persons/${modifiedPerson.id}`)}}

	))
}
