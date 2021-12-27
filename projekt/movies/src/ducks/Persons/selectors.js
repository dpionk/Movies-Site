export const getPersons = (state) => state.persons;

export const getPersonDetails = (state, id) => {
	if (id !== null)
	{return state.persons.find(person => person.id === parseInt(id))}
	else {
		return {}
	}
}