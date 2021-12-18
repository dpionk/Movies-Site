import types from './types';

export const personListAction = (persons) => ({
    type: types.PERSON_LIST,
    payload: persons
});


export const personCreateAction = (newPerson) => ({
    type: types.PERSON_ADD,
    payload: newPerson
});
