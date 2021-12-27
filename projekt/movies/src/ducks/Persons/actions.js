import types from './types';

export const personListAction = (persons) => ({
    type: types.PERSON_LIST,
    payload: persons
});


export const personCreateAction = (newPerson) => ({
    type: types.PERSON_ADD,
    payload: newPerson
});

export const personDeleteAction = (personToDelete) => ({
    type: types.PERSON_DELETE,
    payload: personToDelete
});

export const personEditAction = (modifiedPerson) => ({
    type: types.PERSON_EDIT,
    payload: modifiedPerson
});

