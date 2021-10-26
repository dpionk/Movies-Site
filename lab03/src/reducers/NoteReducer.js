import { NOTE_ADD, NOTE_EDIT, NOTE_DELETE } from "../actions/NoteActions";

export const NoteReducer = (state = [], action) => {
    switch(action.type) {
        case NOTE_ADD: 
            return [...state, action.payload];
		case NOTE_EDIT:
			return [...state.map((element) => {
				if (element.id === action.payload.id) {
					const nowyElement = element
					console.log(action.payload.text)
					nowyElement.text = action.payload.text
					return nowyElement
				}
				return element
			})]
		case NOTE_DELETE:
			return [...state.filter((element => element.id !== action.payload.id))]
        default:
            return state;
    }
}