export const getPersons = (state) => state.persons;

export const getPersonDetails = (state, id) => {
	if (id !== null)
	{return state.persons.find(person => person.id === parseInt(id))}
	else {
		return {}
	}
}

export const getNationalities = (state) => {
	return state.persons.reduce((prev,curr) => {
		let key = curr['nationality'].toLowerCase()
		if (!prev.find((element) => element[0] === key)) {
			prev = [...prev, [key, 1]]
		}
		else {
			prev = prev.map((element) => {
				if (element[0] === key) {
					return [key, element[1] + 1]
				}
				return element
			})
		}
	return prev
}, [] )

}