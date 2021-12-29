export const getActors = (state) => state.actors

export const getActorsFromMovie = (state, movie_id) =>  state.actors.filter((movie) => movie.movie_id === movie_id)