
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovies } from '../../ducks/Movies/selectors'
import { AiFillFilter } from 'react-icons/ai';
import { BiSort } from 'react-icons/bi';
import Movie from './Movie'
import Sort from '../Sort/Sort'
import Filter from '../Filter/Filter'
import Pagination from '../Pagination/Pagination'
import './Movies.scss';
import { getActors } from '../../ducks/Actors/selectors';

function Movies({movies, actors}) {


	const [movieFilterText, setMovieFilterText] = useState(null);
	const [movieFilterGenre, setMovieFilterGenre] = useState(null);
	const [shownMovies, setShownMovies] = useState([]);
	const [movieSort, setMovieSort] = useState(null);
	const [showSort, setShowSort] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [dateActive, setDateActive] = useState(false);
	const [defaultActive, setDefaultActive] = useState(false);
	const [alphabeticActive, setAlphabeticActive] = useState(false);
	const [actorMovieActive, setActorMovieActive] = useState(false);

	useEffect(() => {
		let moviesToShow = movies.map((movie) => {
			for (let i=0;i<actors.length;i++) {
				if (actors[i][0] === movie.id) {
					return {
						...movie,
						'actors': actors[i][1]
					}
				}
			}
			return {
				...movie,
				'actors': 0
			}
		})
		if (movieSort) {
			moviesToShow = moviesToShow.sort(movieSort)
		}
		if (movieFilterGenre) {
			moviesToShow = moviesToShow.filter(x => {return x.genre.toLowerCase() === movieFilterGenre})
		}
		if (movieFilterText) {
			moviesToShow = moviesToShow.filter(x => {return x.title.toLowerCase().indexOf(movieFilterText.toLowerCase()) > -1})
		}
		setShownMovies(moviesToShow);
	}, [movieSort, movies,  movieFilterText, movieFilterGenre,actors])

	const { id = "1" } = useParams();
	const moviesPerPage = 3;
	const indexOfLastMovie = Number(id) * moviesPerPage;
	const indexOfFirstMovie = Number(id - 1) * moviesPerPage;
	const currentMovies = shownMovies.slice(indexOfFirstMovie, indexOfLastMovie)

	const handleFilterReset = () => {
		setMovieFilterText(null);
		setMovieFilterGenre(null);
	}

	const moviesAlphabetic = () => {
		setMovieSort(() => (a, b) => {
			return (a.title > b.title) ? 1 : -1
		})
		setAlphabeticActive(true);
		setDateActive(false);
		setDefaultActive(false);
		setActorMovieActive(false);
	};

	const moviesByDate = () => {
		setMovieSort(() => (a, b) => {
			return (a.release_date > b.release_date) ? 1 : -1
		})
		setAlphabeticActive(false);
		setDateActive(true);
		setDefaultActive(false);
		setActorMovieActive(false);
	};

	const moviesByActors = () => {
		setMovieSort(() => (a,b) => {
			return (a.actors < b.actors ? 1 : -1)
		})
		setAlphabeticActive(false);
		setDateActive(false);
		setDefaultActive(false);
		setActorMovieActive(true);
	}

	const moviesDefault = () => {
		setMovieSort(null);
		setAlphabeticActive(false);
		setDateActive(false);
		setDefaultActive(true);
		setActorMovieActive(false);
	};

	const handleSort = () => {
		if (showSort) {
			setShowSort(false);
		}
		else {
			setShowSort(true);
			setShowFilter(false);
		}
	}
	const handleFilter = () => {
		if (showFilter) {
			setShowFilter(false);
		}
		else {
			setShowFilter(true);
			setShowSort(false);
		}
	}

	const movieList = currentMovies.map((movie) => {
		const movieInList = <Movie 
		title={movie.title}
		image_url={movie.image_url}
		key={movie.id}
		id={movie.id}/>
		return movieInList
	})

	return (
		<div>
				<div className="movies-container">
					<div className="movies">
						<div className="sort">
							<div className="buttons">
							<button className="btn" onClick={handleSort}><BiSort/></button>
							<button className="btn" onClick={handleFilter}><AiFillFilter/></button>
							</div>
							<div className="displaying">
							{showSort ? <Sort whatToShow='movies' moviesByActors={moviesByActors} actorMovieActive={actorMovieActive} alphabeticActive={alphabeticActive} dateActive={dateActive} defaultActive={defaultActive} alphabetic={moviesAlphabetic} byDate={moviesByDate} defaultSort={moviesDefault}/> : null}
							{showFilter ? <Filter whatToShow='movies' setFilterText={setMovieFilterText} setFilterGenre={setMovieFilterGenre} handleFilterReset={handleFilterReset}/> : null}
							</div>
						</div>
						<div className="list-group">
							{movieList && movieList}
						</div>
					</div>
					<div className="pagination-container">
					<Pagination whatToShow='movies' data={shownMovies} elementsPerPage={moviesPerPage} />
					</div>
				</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		movies: getMovies(state),
		actors: getActors(state).reduce((prev,curr) => {
			let key = curr['movie_id']
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
	}, [] ).sort((a, b) => {
		return (a[1] < b[1]) ? 1 : -1
	})
	};
}


export default connect(mapStateToProps,null)(Movies);