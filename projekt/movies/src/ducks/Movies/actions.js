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

export const movieEditDirectorAction = (movie, director_id) => ({
	type: types.MOVIE_EDIT_DIRECTOR,
	payload: {'movie': movie.id, 'director': director_id}
})

export const movieDeleteDirectorAction = (movie) => ({
	type:types.MOVIE_DELETE_DIRECTOR,
	payload: movie
})