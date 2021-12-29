import axios from 'axios';
import * as actions from './actions';

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

            axios.post('http://localhost:5000/api/movies', newMovie).then((response) => {
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

export const deleteMovie = (movieToDelete) => {
	return async dispatch => {

            axios.delete(`http://localhost:5000/api/movies/${movieToDelete.id}`).then(() => {
				dispatch(actions.movieDeleteAction(movieToDelete));
			}).catch((error) => {
				console.log(error)
			})
    }
}

export const editMovie = (modifiedMovie) => {
	return async dispatch => {
            axios.put(`http://localhost:5000/api/movies/${modifiedMovie.id}`, modifiedMovie).then((response) => {
				console.log(modifiedMovie.director)
					dispatch(actions.movieEditAction(response.data))
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