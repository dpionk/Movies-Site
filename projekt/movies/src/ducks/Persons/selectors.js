export const getPersons = (state) => state.persons;

export const getPersonDetails = (state, id) => {return state.persons.find(person => person.id === parseInt(id))}