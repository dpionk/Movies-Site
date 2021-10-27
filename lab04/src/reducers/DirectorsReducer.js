import { DIRECTOR_ADD, DIRECTOR_EDIT, DIRECTOR_DELETE } from "../actions/DirectorsActions";


export const DirectorsReducer = (state = [], action) => {
    switch(action.type) {
        case DIRECTOR_ADD: 
		console.log(state)
            return [...state, action.payload];
		case DIRECTOR_EDIT:
			return [...state.map((element) => {
				if (element.id === action.payload.id) {
					const nowyElement = element
					nowyElement.firstName = action.payload.firstName
                    nowyElement.lastName = action.payload.lastName
                    nowyElement.age = action.payload.age
					return nowyElement
				}
				return element
			})]
		case DIRECTOR_DELETE:
			return [...state.filter((element => element.id !== action.payload.id))]
        default:
            return state;
    }
}