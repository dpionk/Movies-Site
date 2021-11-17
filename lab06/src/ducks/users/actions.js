import types from './types';

export const userListAction = (users) => ({
    type: types.USER_LIST,
    payload: users
});

export const userDetailsAction = (user) => ({
    type: types.USER_DETAILS,
    payload: user
});

export const userCreateAction = (newUser) => ({
    type: types.USER_CREATE,
    payload: newUser
});
