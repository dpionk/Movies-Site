import axios from 'axios';
import * as actions from './actions';
import * as movieActions from '../Movies/actions'

export const getPersonList = () => {
	return async dispatch => {
            axios.get('http://localhost:5000/api/persons').then((response) => {
				dispatch(actions.personListAction(response.data));
			}).catch((error) => {
				console.log(error)
			})
    }
}

export const createPerson = (newPerson) => {
	return async dispatch => {
            axios.post('http://localhost:5000/api/persons', newPerson).then((response) => {
				dispatch(actions.personCreateAction(response.data));
			}).catch((error) => {
				console.log(error)
			})  
    }
}

export const deletePerson = (personToDelete, movies) => {
	if (movies.length === 0) {
	return async dispatch => {
            axios.delete(`http://localhost:5000/api/persons/${personToDelete.id}`).then(() => {
				dispatch(actions.personDeleteAction(personToDelete));
			}).catch((error) => {
				console.log(error)
			})		
    }
	}
	else {
		let promiseArray = movies.map((movie) => {
			return (axios.patch(`http://localhost:5000/api/movies/${movie.id}/director`))
		})
		promiseArray = [...promiseArray, axios.delete(`http://localhost:5000/api/persons/${personToDelete.id}`)]
		return async dispatch => {
			Promise.all(promiseArray).then(() => {
				for (let i  in movies) {
					dispatch(movieActions.movieDeleteAction(i));
				}
				dispatch(actions.personDeleteAction(personToDelete));
			}).catch((error) => {
				console.log(error)
			})		
    }
		
	}
}

export const editPerson = (modifiedPerson) => {
	return async dispatch => {
		axios.put(`http://localhost:5000/api/persons/${modifiedPerson.id}`, modifiedPerson).then((response) => {
			dispatch(actions.personEditAction(response.data))
		}).catch((error) => {
			console.log(error)
		})
	}
}