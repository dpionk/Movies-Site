import types from "./types";

const requestBody = (state) => {
	return {
		...state,
		loading: true,
		error: null
	}
}

const failureBody = (state) => {
	return {
		...state,
		loading: false,
		error: true
	}
}

export const actorReducer = (state = { items: [], loading:false, error:null}, action) => {
    switch(action.type) {
        case types.ACTOR_LIST_REQUEST: 
			return requestBody(state);
		case types.ACTOR_LIST_SUCCESS:
			return {
				...state,
				loading:false,
				items: action.payload
			};
		case types.ACTOR_LIST_FAILURE:
			return {
				...state,
				loading:false,
				error: true,
				items: []
			};
		case types.ACTOR_ADD_REQUEST: 
			return requestBody(state);
        case types.ACTOR_ADD_SUCCESS:
            return {
				...state,
				loading: false,
				items : [...state.items, action.payload]
			};
		case types.ACTOR_ADD_FAILURE:
			return failureBody(state);
		case types.ACTOR_DELETE_REQUEST:
			return requestBody(state);
		case types.ACTOR_DELETE_SUCCESS:
			return {
				...state,
				loading:false,
				items: state.items.filter(actor => (actor.movie_id !== action.payload.movie.id) || (actor.movie_id === action.payload.movie.id && actor.person_id !== action.payload.actor.id))
			}
		case types.ACTOR_DELETE_FAILURE: 
			return failureBody(state);
        default:
            return state;
    }
}