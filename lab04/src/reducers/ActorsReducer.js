import { ACTOR_ADD, ACTOR_EDIT, ACTOR_DELETE } from "../actions/ActorsActions";


export const ActorsReducer = (state = [{"id": "ec88133a-959f-48b6-b6e3-d5d20d4913ce", "firstName": "Timothée", "lastName":"Chalamet", "age": 26},
{"id": "eb368cd4-2681-46ef-b419-47c36beaafdd", "firstName": "Jennifer", "lastName": "Lawrence", "age": 31},
{"id": "9b0db9fc-fda3-455b-aa84-6f949d600d57", "firstName": "Rebecca", "lastName": "Ferguson", "age": 38}], action) => {
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
			return [...state.filter((element => element.id !== action.payload.id))];
        default:
            return state;
    }
}