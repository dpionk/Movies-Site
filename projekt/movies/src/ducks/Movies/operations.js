import axios from 'axios';
import * as actions from './actions';
import * as actorActions from '../Actors/actions'
import { createAction } from "redux-api-middleware";
import types from "./types";

//export const getMovieList = (setLoading) => {
//	return async dispatch => {
//		setLoading(true);
//		axios.get('http://localhost:5000/api/movies').then((response)=> {
//			dispatch(actions.movieListAction(response.data));
//		}).catch(() => {
//			setLoading(false);
//			alert('Nie udało się pobrać filmów')
//		}).finally(() => {
//			setLoading(false);
//		})
//    }
//}

export const getMovieList = () => {
	return createAction({
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
			{ type: types.MOVIE_LIST_FAILURE
			} 
		]
	})
 }

//export const createMovie = (newMovie, setPending, setError, history) => {
//	return async dispatch => {
//		setPending(true)
//            axios.post('http://localhost:5000/api/movies', newMovie).then((response) => {
//				dispatch(actions.movieCreateAction(response.data));
//				alert('Dodano!')
//				history('/movies/page/1')
//			}).catch((error) => {
//				setError(true);
//				if (!error.response) return alert("Brak połączenia z bazą danych")
//				if (error.response.data === 'TITLE_DUPLICATE') {
//					alert('Zduplikowany tytuł!')
//				}
//				if (error.response.data === 'DIRECTOR_NOT_EXISTS') {
//					alert('Nie ma takiej osoby!')
//				}

//			}).finally(
//				()=>{setPending(false)}
//			)
//    }
//}

export const createMovie = (newMovie) => {
	return createAction({
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
			{ type: types.MOVIE_ADD_FAILURE
			} 
		],
		body: JSON.stringify(newMovie)
	})
}

export const deleteMovie = (movieToDelete, actors) => {
	return async dispatch => {
			if (actors.length === 0) {
            axios.delete(`http://localhost:5000/api/movies/${movieToDelete.id}`).then(() => {
				dispatch(actions.movieDeleteAction(movieToDelete));
			}).catch((error) => {
				console.log(error)
			})
		}
		else {
			let promiseArray = actors.map((actor) => {
				return axios.delete(`http://localhost:5000/api/movies/${movieToDelete.id}/actors/${actor.id}`)
			})
			promiseArray = [...promiseArray, axios.delete(`http://localhost:5000/api/movies/${movieToDelete.id}`)]

			Promise.all(promiseArray).then(() => {
				for (let i  in actors) {
					dispatch(actorActions.actorDeleteAction(actors[i], movieToDelete));
				}
				dispatch(actions.movieDeleteAction(movieToDelete));
				alert('Usunięto')
			}).catch((error) => {
				console.log(error)
			})		
		}
    }
}

//export const editMovie = (modifiedMovie, setPending, setError,history) => {
	
//	return async dispatch => {
//		setPending(true);
//            axios.put(`http://localhost:5000/api/movies/${modifiedMovie.id}`, modifiedMovie).then(() => {
//					dispatch(actions.movieEditAction(modifiedMovie))
//					alert("Edycja przebiegła pomyślnie");
//					history(`/movies/${modifiedMovie.id}`)
//			}).catch((error) => {
//				setError(true);
//				if (!error.response) return alert("Brak połączenia z bazą danych")
//				if (error.response.data === 'DIRECTOR_NOT_EXISTS') {
//					alert('Nie ma takiej osoby!')
//				}
//			}).finally(
//				()=>{setPending(false)}
//			)
                
//    }
//}

export const editMovie = (modifiedMovie) => {
	return createAction({
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
			{ type: types.MOVIE_EDIT_FAILURE
			} 
		],
		body: JSON.stringify(modifiedMovie)
	})
}

//export const editDirector = (movie, director_id) => {
//	return async dispatch => {
//		axios.patch(`http://localhost:5000/api/movies/${movie.id}/director`, director_id).then(() => {
//			dispatch(actions.movieEditDirectorAction(movie,director_id))
//		}).catch((error) => {
//			if (error.response.data === 'DIRECTOR_NOT_EXISTS')
//			{
//				alert('Nie ma takiej osoby!')
//			}
//			console.log(error)
//		})
//	}
//}

export const editDirector = (movie, director_id) => {

	return createAction({
		endpoint: `http://localhost:5000/api/movies/${movie.id}/director`,
		method: 'PATCH',
		headers: {
		 'Content-Type': 'application/json'
		},
		types: [
			{ type: types.MOVIE_EDIT_DIRECTOR_REQUEST },
			{
			  type: types.MOVIE_EDIT_DIRECTOR_SUCCESS,
			  payload: {'movie': movie.id, 'director': director_id}
			},
			{ type: types.MOVIE_EDIT_DIRECTOR_FAILURE
			} 
		],
		body: JSON.stringify(director_id)
	})
}


//export const deleteDirector = (movie) => {
//	return async dispatch => {
//		axios.patch(`http://localhost:5000/api/movies/${movie.id}/director`, {}).then(() => {
//			dispatch(actions.movieDeleteDirectorAction(movie))
//		}).catch((error) => {
//			if (error.response.data === 'DIRECTOR_NOT_EXISTS')
//			{
//				alert('Nie ma takiej osoby!')
//			}
//			console.log(error)
//		})
//	}
//}

export const deleteDirector = (movie) => {
	return createAction({
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
			{ type: types.MOVIE_DELETE_DIRECTOR_FAILURE
			} 
		],
		body: '{}'
	})
}