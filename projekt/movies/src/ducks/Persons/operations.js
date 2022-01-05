import axios from 'axios';
import * as actions from './actions';
import * as movieActions from '../Movies/actions'
import * as actorActions from '../Actors/actions'

export const getPersonList = (setLoading) => {
	return async dispatch => {
		setLoading(true);
            axios.get('http://localhost:5000/api/persons').then((response) => {
				dispatch(actions.personListAction(response.data));
			}).catch(() => {
				alert('Nie udało się pobrać osób')
			}).finally(() => {
				setLoading(false);
			})
    }
}

export const createPerson = (newPerson, setPending, setError) => {
	return async dispatch => {
		setPending(true)
            axios.post('http://localhost:5000/api/persons', newPerson).then((response) => {
				dispatch(actions.personCreateAction(response.data));
				alert('Dodano')
			}).catch(() => {
				setError(true)
				alert("Brak połączenia z bazą danych")
			}).finally(() => {
				setPending(false)
			})
    }
}

export const deletePerson = (personToDelete, moviesWhereDirected, moviesWhereActed) => {
	if (moviesWhereDirected.length === 0 && moviesWhereActed.length === 0) {
	return async dispatch => {
            axios.delete(`http://localhost:5000/api/persons/${personToDelete.id}`).then(() => {
				dispatch(actions.personDeleteAction(personToDelete));
				alert('Usunięto')
			}).catch((error) => {
				console.log(error)
			})		
    }
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

export const editPerson = (modifiedPerson, setPending, setError) => {
	return async dispatch => {
		setPending(true);
		axios.put(`http://localhost:5000/api/persons/${modifiedPerson.id}`, modifiedPerson).then((response) => {
			dispatch(actions.personEditAction(response.data))
			alert("Edycja przebiegła pomyślnie")
		}).catch(() => {
			setError(true);
			alert("Brak połączenia z bazą danych")
		}).finally(() => {
			setPending(true);
		})
	}
}