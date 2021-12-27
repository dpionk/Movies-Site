import types from "./types";

export const personReducer = (state = [], action) => {
    switch(action.type) {
        case types.PERSON_LIST: 
            return [...action.payload]
        case types.PERSON_ADD:
            return [...state, action.payload]; 
		case types.PERSON_DELETE:
			return state.filter(person => person.id !== action.payload.id)
		case types.PERSON_EDIT:
			return state.map(person => {
				if (person.id === action.payload.id) {
					return action.payload
					}
				return person
			})
        default:
            return state;
    }
}