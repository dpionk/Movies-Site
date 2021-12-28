export const getMovies = (state) => state.movies;

export const getMovieDetails = (state, id) => {return state.movies.find(movie => movie.id === parseInt(id))}

export const getMoviesWhereDirected = (state, director_id) => {return state.movies.filter(movie => movie.director_id === director_id)}

export const getGenres = (state) => {
	return state.movies.reduce((prev,curr) => {
		let key = curr['genre'].toLowerCase()
		if (!prev.find((element) => element[0] === key)) {
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