import axios from "axios";
import * as actions from './actions';

export const getUserList = () => {
    return async dispatch => {
        const response = await 
            axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch(actions.userListAction(response.data));
    }
}

export const getUser = (id) => {
    return async dispatch => {
        const response = await 
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        dispatch(actions.userDetailsAction(response.data));
    }
}

export const createUser = (newUser) => {
    return async dispatch => {
        try {
            const response = await 
            axios.post('https://jsonplaceholder.typicode.com/users', newUser);
            if(response.status === 201) 
                dispatch(actions.userCreateAction(response.data));
        } catch(ex) {

        }
    }
}