import types from "./types";

export const personReducer = (state = { items: [], loading:false, error:null}, action) => {
    switch(action.type) {
		case types.PERSON_LIST_REQUEST: 
		return {
			...state,
			loading:true,
			error:null
		};
	case types.PERSON_LIST_SUCCESS:
		return {
			...state,
			loading:false,
			items: action.payload
		};
	case types.PERSON_LIST_FAILURE:
		return {
			...state,
			loading:false,
			error: action.error,
			items: []
		};
		case types.PERSON_ADD_REQUEST:
			return {
				...state,
				loading: true,
				error:null
			}
        case types.PERSON_ADD_SUCCESS:
            return {
				...state,
				loading:false,
				items: [...state.items, action.payload]
			}
		case types.PERSON_ADD_FAILURE:
			return {
				...state,
				loading:false,
				error: action.error
			}
		case types.PERSON_DELETE:
			return {
				...state,
				items: state.items.filter(person => person.id !== action.payload.id)
			}
			case types.PERSON_EDIT_REQUEST:
				return {
					...state,
					loading: true,
					error:null
				}
		case types.PERSON_EDIT_SUCCESS:
				return {
					...state,
					loading:false,
					items: state.items.map(person => {
						if (person.id === action.payload.id) {
							return action.payload
						}
						return person
					})
				}
		case types.PERSON_EDIT_FAILURE:
				return {
					...state,
					loading:false,
					error: action.error
				}
        default:
            return state;
    }
}