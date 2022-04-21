export const getActors = (state) => state.actors.items

export const getActorsFromMovie = (state, movie_id) =>  state.actors.items.filter((movie) => movie.movie_id === movie_id)