
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

function Movies({movies}) {


	const [shownMovies, setShownMovies] = useState([]);
	const [movieSort, setMovieSort] = useState(null);
	const [showSort, setShowSort] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [dateActive, setDateActive] = useState(false);
	const [defaultActive, setDefaultActive] = useState(false);
	const [alphabeticActive, setAlphabeticActive] = useState(false);

	useEffect(() => {
		let books = [...movies]
		if (movieSort) {
			books = books.sort(movieSort)
		}
		setShownMovies(books);
	}, [movieSort, movies])

	const { id = "1" } = useParams();
	const moviesPerPage = 3;
	const indexOfLastMovie = Number(id) * moviesPerPage;
	const indexOfFirstMovie = Number(id - 1) * moviesPerPage;
	const currentMovies = shownMovies.slice(indexOfFirstMovie, indexOfLastMovie)

	const moviesAlphabetic = () => {
		setMovieSort(() => (a, b) => {
			return (a.title > b.title) ? 1 : -1
		})
		setAlphabeticActive(true);
		setDateActive(false);
		setDefaultActive(false);
	};

	const moviesByDate = () => {
		setMovieSort(() => (a, b) => {
			return (a.release_date > b.release_date) ? 1 : -1
		})
		setAlphabeticActive(false);
		setDateActive(true);
		setDefaultActive(false);
	};

	const moviesDefault = () => {
		setMovieSort(null);
		setAlphabeticActive(false);
		setDateActive(false);
		setDefaultActive(true);
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
		director={movie.director}
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
							{showSort ? <Sort alphabeticActive={alphabeticActive} dateActive={dateActive} defaultActive={defaultActive} moviesAlphabetic={moviesAlphabetic} moviesByDate={moviesByDate} moviesDefault={moviesDefault}/> : null}
							{showFilter ? <Filter/> : null}
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
		movies: getMovies(state)
	};
}


export default connect(mapStateToProps,null)(Movies);