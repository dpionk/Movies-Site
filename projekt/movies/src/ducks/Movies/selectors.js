export const getMovies = (state) => state.movies;

export const getMovieDetails = (state, id) => {return state.movies.find(movie => movie.id === parseInt(id))}