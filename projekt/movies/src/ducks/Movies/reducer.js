import types from "./types";

export const movieReducer = (state = [], action) => {
    switch(action.type) {
        case types.MOVIE_LIST: 
            return [...action.payload]
        case types.MOVIE_ADD:
            return [...state, action.payload]; 
		case types.MOVIE_DELETE:
			return state.filter(movie => movie.id !== action.payload.id)
		case types.MOVIE_EDIT:
			return state.map(movie => {
				if (movie.id === action.payload.id) {
					return action.payload
				}
				return movie
			})
        default:
            return state;
    }
}