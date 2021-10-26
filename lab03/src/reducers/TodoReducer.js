import { TODO_ADD, TODO_EDIT, TODO_DONE, TODO_DELETE } from "../actions/TodoActions";

export const TodoReducer = (state = [], action) => {
    switch(action.type) {
        case TODO_ADD: 
            return [...state, action.payload];
		case TODO_EDIT:
			return [...state.map((element) => {
				if (element.id === action.payload.id) {
					const nowyElement = element
					nowyElement.name = action.payload.name
                    nowyElement.date = action.payload.date
					return nowyElement
				}
				return element
			})]
		case TODO_DONE:
			return [...state.map((element) => {
				if (element.id === action.payload.id) {
					if (element.done === false ) {
					const nowyElement = element
					nowyElement.done = true
					return nowyElement
					}
						const nowyElement = element
						nowyElement.done = false
						return nowyElement
				}
				return element
			})]
		case TODO_DELETE:
			return [...state.filter((element => element.id !== action.payload.id))]
        default:
            return state;
    }
}