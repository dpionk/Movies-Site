import axios from 'axios';
import * as actions from './actions';
import { createAction } from "redux-api-middleware";
import types from "./types";

//export const getActorList = () => {
	
//	return async dispatch => {
//		axios.get('http://localhost:5000/api/actors').then((response)=> {
//			dispatch(actions.actorListAction(response.data));
//		}).catch(() => {
//			alert('Nie udało się pobrać aktorów')
//		})
//    }
//}

export const getActorList = () => {
	return createAction({
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
			{ type: types.ACTOR_LIST_FAILURE
			} 
		]
	})
 }


//export const getMovieActorList = (movie) => {
//	return async dispatch => {
//		axios.get(`http://localhost:5000/api/movies/${movie.id}/actors`).then((response)=> {
//			dispatch(actions.movieActorListAction(response.data));
//		}).catch((error) => {
//			console.log(error)
//		})
//    }
//}

//export const getMovieActorList = (movie) => {
//	return createAction({
//		endpoint: `http://localhost:5000/api/movies/${movie.id}/actors`,
//		method: 'GET',
//		headers: {
//		 'Content-Type': 'application/json'
//		},
//		types: [
//			{ type: types.ACTOR_IN_MOVIE_REQUEST },
//			{
//			  type: types.ACTOR_IN_MOVIE_SUCCESS
//			},
//			{ type: types.ACTOR_IN_MOVIE_FAILURE
//			} 
//		]
//	})
// }



//export const createActor = (movie,actor) => {

//	return async dispatch => {

//            axios.post(`http://localhost:5000/api/movies/${movie.id}/actors`, { 'id' : actor.id}).then((response) => {
//				dispatch(actions.actorCreateAction(response.data));
//				alert('Dodano aktora')
//			}).catch((error) => {
//				if (error.response.data === 'ELEMENT_NOT_EXIST') {
//					alert('Nie ma takiej osoby!')
//				}
//			})
//    }
//}

export const createActor = (movie,actor) => {
	return createAction({
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
			{ type: types.ACTOR_ADD_FAILURE
			} 
		],
		body: JSON.stringify({ "id" : actor.id})
	})
}

//export const deleteMovieActor = (movie,actor) => {
//	return async dispatch => {
//            axios.delete(`http://localhost:5000/api/movies/${movie.id}/actors/${actor.id}`).then(() => {
//				dispatch(actions.actorDeleteAction(actor,movie));
//				alert('Usunięto aktora')
//			}).catch((error) => {
//				console.log(error)
//			})
//    }
//}

export const deleteMovieActor = (movie, actor) => {
	return createAction({
		endpoint: `http://localhost:5000/api/movies/${movie.id}/actors/${actor.id}`,
		method: 'DELETE',
		headers: {
		 'Content-Type': 'application/json'
		},
		types: [
			{ type: types.ACTOR_DELETE_REQUEST },
			{
			  type: types.ACTOR_DELETE_SUCCESS,
			  payload: { 'movie': movie, 'actor' : actor}
			},
			{ type: types.ACTOR_DELETE_FAILURE
			} 
		]
	})
}