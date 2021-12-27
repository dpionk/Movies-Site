export const getMovies = (state) => state.movies;

export const getMovieDetails = (state, id) => {return state.movies.find(movie => movie.id === parseInt(id))}

export const getMoviesWhereDirected = (state, director_id) => {return state.movies.filter(movie => movie.director_id === director_id)}