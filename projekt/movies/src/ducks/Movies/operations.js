import axios from 'axios';
import * as actions from './actions';
import * as actorActions from '../Actors/actions'

export const getMovieList = () => {
	return async dispatch => {
		axios.get('http://localhost:5000/api/movies').then((response)=> {
			dispatch(actions.movieListAction(response.data));
		}).catch((error) => {
			console.log(error)
		})
    }
}

export const createMovie = (newMovie) => {
	return async dispatch => {

		 const movieToAdd = {
			...newMovie,
			director: {"id" : newMovie.director_id }
		}
            axios.post('http://localhost:5000/api/movies', movieToAdd).then((response) => {
				dispatch(actions.movieCreateAction(response.data));
				alert('Dodano!')
			}).catch((error) => {
				if (error.response.data === 'TITLE_DUPLICATE') {
					alert('Zduplikowany tytuł!')
				}
				if (error.response.data === 'DIRECTOR_NOT_EXISTS') {
					alert('Nie ma takiej osoby!')
				}
			})
    }
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
			}).catch((error) => {
				console.log(error)
			})		
		}
    }
}

export const editMovie = (modifiedMovie) => {
	
	const modifiedMovie2 = {
		...modifiedMovie,
		director: {"id" : modifiedMovie.director_id}
	}

	if (!modifiedMovie.director_id) {
		modifiedMovie2.director = undefined
	}
	console.log(modifiedMovie)
	console.log(modifiedMovie2)
	return async dispatch => {
		console.log(modifiedMovie)
            axios.put(`http://localhost:5000/api/movies/${modifiedMovie.id}`, modifiedMovie2).then(() => {
					dispatch(actions.movieEditAction(modifiedMovie))
					alert("Edycja przebiegła pomyślnie");
			}).catch((error) => {
				if (error.response.data === 'DIRECTOR_NOT_EXISTS') {
					alert('Nie ma takiej osoby!')
				}
				console.log(error)
			})
                
    }
}

export const editDirector = (movie, director_id) => {
	console.log(director_id)
	return async dispatch => {
		axios.patch(`http://localhost:5000/api/movies/${movie.id}/director`, director_id).then(() => {
			dispatch(actions.movieEditDirectorAction(movie,director_id))
		}).catch((error) => {
			if (error.response.data === 'DIRECTOR_NOT_EXISTS')
			{
				alert('Nie ma takiej osoby!')
			}
			console.log(error)
		})
	}
}