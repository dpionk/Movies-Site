import axios from 'axios';
import * as actions from './actions';

export const getActorList = () => {
	return async dispatch => {
		axios.get('http://localhost:5000/api/actors').then((response)=> {
			dispatch(actions.actorListAction(response.data));
		}).catch((error) => {
			console.log(error)
		})
    }
}

export const getMovieActorList = (movie) => {
	return async dispatch => {
		axios.get(`http://localhost:5000/api/movies/${movie.id}/actors`).then((response)=> {
			dispatch(actions.movieActorListAction(response.data));
		}).catch((error) => {
			console.log(error)
		})
    }
}


export const createActor = (movie,actor) => {
	return async dispatch => {

            axios.post(`http://localhost:5000/api/movies/${movie.id}/actors`, { 'id' : actor.id}).then((response) => {
				dispatch(actions.actorCreateAction(actor, movie));
			}).catch((error) => {
				if (error.response.data === 'ELEMENT_NOT_EXIST') {
					alert('Nie ma takiej osoby!')
				}
			})
    }
}

export const deleteMovie = (movie,actor) => {
	return async dispatch => {

            axios.delete(`http://localhost:5000/api/movies/${movie.id}/${actor.id}`).then(() => {
				dispatch(actions.actorDeleteAction(actor,movie));
			}).catch((error) => {
				console.log(error)
			})
    }
}
