import { ACTOR_ADD, ACTOR_EDIT, ACTOR_DELETE } from "../actions/ActorsActions";


export const ActorsReducer = (state = [], action) => {
    switch(action.type) {
        case ACTOR_ADD: 
            return [...state, action.payload];
		case ACTOR_EDIT:
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
		case ACTOR_DELETE:
			return [...state.filter((element => element.id !== action.payload.id))]
        default:
            return state;
    }
}