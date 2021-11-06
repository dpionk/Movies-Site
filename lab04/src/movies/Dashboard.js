import { connect } from "react-redux";

function Dashboard({movies, actors, actorsInMovies}, props) {

    const howMuch = actorsInMovies.reduce((acc, element) => {

		if (Object.hasOwnProperty.bind(acc) ) {
			 
			const obj = {
				...acc,
			}
			obj[element.movieID] = obj[element.movieID] + "a"
			return obj
		}

		else {
			const obj = {
				...acc,
			}
			obj[element.movieID] = "a"
			return obj
		}
	}, {})

	console.log(howMuch)
    return (
        <div>
			<div>
				Najnowsze filmy:
			</div>
			<br/>
			<div>
            {movies.sort((a,b) => (a.productionYear < b.productionYear) ? 1 : ((b.productionYear < a.productionYear) ? -1 : 0)).slice(0,3).map((movie) => { return (
                <div>
                    <div>
                        {movie.title}   {movie.productionYear}
                    </div>
                    </div>
                    )
            })}
			</div>
			<br/>
			<div>
				Filmy z największą liczbą aktorów:
			</div>
			<br/>
			<div>
				Aktorzy z największą liczbą filmów:
			</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
		actors: state.actors,
		actorsInMovies: state.actorsInMovies
    }
}

export default connect(mapStateToProps, null)(Dashboard);