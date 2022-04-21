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

export const movieReducer = (state = { items: [], loading: false, error: null }, action) => {
	switch (action.type) {
		case types.MOVIE_LIST_REQUEST:
			return requestBody(state);
		case types.MOVIE_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				items: action.payload
			};
		case types.MOVIE_LIST_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
				items: []
			};
		case types.MOVIE_ADD_REQUEST:
			return requestBody(state);
		case types.MOVIE_ADD_SUCCESS:
			return {
				...state,
				loading: false,
				items: [...state.items, action.payload]
			};
		case types.MOVIE_ADD_FAILURE:
			return failureBody(state);
		case types.MOVIE_DELETE_REQUEST:
			return requestBody(state);
		case types.MOVIE_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				items: state.items.filter(movie => movie.id !== action.payload.id)
			};
		case types.MOVIE_DELETE_FAILURE:
			return failureBody(state);
		case types.MOVIE_EDIT_REQUEST:
			return requestBody(state);
		case types.MOVIE_EDIT_SUCCESS:
			return {
				...state,
				loading: false,
				items: state.items.map(movie => {
					if (movie.id === action.payload.id) {
						return action.payload
					}
					return movie
				})
			};
		case types.MOVIE_EDIT_FAILURE:
			return failureBody(state);
		case types.MOVIE_EDIT_DIRECTOR_REQUEST:
			return requestBody(state);
		case types.MOVIE_EDIT_DIRECTOR_SUCCESS:
			return {
				...state,
				loading: false,
				items: state.items.map(movie => {
					if (movie.id === action.payload.movie) {
						return {
							...movie,
							director_id: action.payload.director.id
						}
					}
					return movie
				})
			};
		case types.MOVIE_EDIT_DIRECTOR_FAILURE:
			return failureBody(state);
		case types.MOVIE_DELETE_DIRECTOR_REQUEST:
			return requestBody(state);
		case types.MOVIE_DELETE_DIRECTOR_SUCCESS:
			return {
				...state,
				loading: false,
				items: state.items.map(movie => {
					if (movie.id === action.payload.id) {
						return {
							...movie,
							director_id: null
						}
					}
					return movie
				})
			};
		case types.MOVIE_DELETE_DIRECTOR_FAILURE:
			return failureBody(state);
		default:
			return state;
	}
}