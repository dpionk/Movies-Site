export const MOVIE_ADD = 'MOVIE_ADD';
export const MOVIE_EDIT = 'MOVIE_EDIT';
export const MOVIE_DELETE = "MOVIE_DELETE";

export const addMovieAction = (payload) => ({
    type: MOVIE_ADD,
    payload
});

export const editMovieAction = (payload) => ({
    type: MOVIE_EDIT,
    payload
});

export const deleteMovieAction = (payload) => ({
    type: MOVIE_DELETE,
    payload
});
