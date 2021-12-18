import types from './types';

export const movieListAction = (movies) => ({
    type: types.MOVIE_LIST,
    payload: movies
});


export const movieCreateAction = (newMovie) => ({
    type: types.MOVIE_ADD,
    payload: newMovie
});
