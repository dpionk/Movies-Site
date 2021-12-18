import axios from 'axios';
import * as actions from './actions';

export const getPersonList = () => {
	return async dispatch => {
        try {
            const response = await 
            axios.get('http://localhost:5000/api/persons');
                dispatch(actions.personListAction(response.data));
        } catch(ex) {
			console.log(ex)
        }
    }
}

export const createPerson = (newPerson) => {
	return async dispatch => {
        try {
            const response = await 
            axios.post('http://localhost:5000/api/persons', newPerson);
                dispatch(actions.personCreateAction(response.data));
				alert('Dodano!')
        } catch(ex) {
			console.log(ex)
        }
    }
}