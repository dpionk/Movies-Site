import types from './types';

export const movieListAction = (movies) => ({
    type: types.MOVIE_LIST,
    payload: movies
});


export const movieCreateAction = (newMovie) => ({
    type: types.MOVIE_ADD,
    payload: newMovie
});

export const movieDeleteAction = (movieToDelete) => ({
	type: types.MOVIE_DELETE,
	payload: movieToDelete
})

export const movieEditAction = (modifiedMovie) => ({
	type: types.MOVIE_EDIT,
	payload: modifiedMovie
})