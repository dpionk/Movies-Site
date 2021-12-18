import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../../ducks/Movies/selectors'
import { getMovieList } from '../../ducks/Movies/operations';
import Movie from './Movie'
import { AiFillFilter } from 'react-icons/ai';
import { BiSort } from 'react-icons/bi';
import './Movies.scss';

function Movies({movies, getMovieList}) {

	useEffect(() => {
        getMovieList();
    }, []);

	const movieList = movies.map((movie) => {
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
							<button className="btn"><BiSort/></button>
							<button className="btn"><AiFillFilter/></button>
							</div>
							<div className="displaying">
							</div>
						</div>
						<div className="list-group">
							{movieList && movieList}
						</div>
					</div>
					<div className="pagination-container">
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

const mapDispatchToProps = {
	getMovieList
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);