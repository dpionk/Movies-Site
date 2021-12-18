import types from "./types";

export const movieReducer = (state = [], action) => {
    switch(action.type) {
        case types.MOVIE_LIST: 
            return [...action.payload]
        case types.MOVIE_ADD:
            return [...state, action.payload]; 
        default:
            return state;
    }
}