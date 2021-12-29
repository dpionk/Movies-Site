import types from "./types";

export const actorReducer = (state = [], action) => {
    switch(action.type) {
        case types.ACTOR_LIST: 
            return [...action.payload]
		case types.ACTOR_IN_MOVIE:
			return state.filter(actor => actor.movie === action.payload.movie && actor.actor === action.payload.actor)
        case types.ACTOR_ADD:
            return [...state, { 'movie': action.payload.movie, 'actor': action.payload.actor}]; 
		case types.ACTOR_DELETE:
			return state.filter(actor => actor.movie !== action.payload.movie && actor.actor !== action.payload.actor)
        default:
            return state;
    }
}