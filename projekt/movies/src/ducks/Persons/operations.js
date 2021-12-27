import axios from 'axios';
import * as actions from './actions';

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

export const deletePerson = (personToDelete) => {
	return async dispatch => {
            axios.delete(`http://localhost:5000/api/persons/${personToDelete.id}`).then(() => {
				dispatch(actions.personDeleteAction(personToDelete));
				alert('Usunięto!')
			}).catch((error) => {
				console.log(error)
			})		
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