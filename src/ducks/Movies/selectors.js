export const getMovies = (state) => state.movies.items;

export const getMovieDetails = (state, id) => {return state.movies.items.find(movie => movie.id === parseInt(id))}

export const getMoviesWhereDirected = (state, director_id) => { console.log(state.movies.items, director_id); return state.movies.items.filter(movie => Number(movie.director_id) === director_id)}

export const getMoviesWhereActed = (state, actor_id) =>  { return state.actors.items.filter((movie) => movie.person_id === actor_id)}

export const getMoviesLoading = (state) => state.movies.loading

export const getGenres = (state) => {
	return state.movies.items.reduce((prev,curr) => {
		let key = curr['genre']
		if (!prev.find((element) => element[0] === key.toLowerCase())) {
			prev = [...prev, [key, 1]]
		}
		else {
			prev = prev.map((element) => {
				if (element[0] === key) {
					return [key, element[1] + 1]
				}
				return element
			})
		}
	return prev
}, [] )

}