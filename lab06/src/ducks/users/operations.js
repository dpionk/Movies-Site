import axios from "axios";
import * as actions from './actions';
import { createAction } from "redux-api-middleware";
import types from './types'
import { schema, normalize } from 'normalizr';

// export const getUserList = () => {
//     return async dispatch => {
//         const response = await 
//             axios.get('https://jsonplaceholder.typicode.com/users');
//         dispatch(actions.userListAction(response.data));
//     }
// }

const userSchema = new schema.Entity('users');
const usersSchema = [userSchema];

export const getUserList = () => {
    return createAction({
        endpoint: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET',
        headers: {
         'Content-Type': 'application/json'
        },
        types: [
        types.USER_LIST_REQUEST,
            // {
            //      type: types.USER_LIST_SUCCESS,
            //      payload: async (action, state, res) => {
            //          console.log('PAYLOAD', action, state, res);
            //          const json = await res.json();
            //          const { entities } = normalize(json, usersSchema)
            //          return entities;
            //      },
            //      meta: { actionType: 'GET_ALL' }
            // },
        types.USER_LIST_FAILURE
        ]
    })
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