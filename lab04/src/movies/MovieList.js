import { connect } from "react-redux";
import { deleteMovieAction } from "../actions/MoviesActions";
import { Link } from 'react-router-dom';

const MovieList = ( {movies, deleteMovieAction},  props ) => {

    return (
        <div>
            {movies.map(movie => (<div><div><Link to={`/movies/${movie.id}`}> {movie.id}  </Link> {movie.title}   {movie.productionYear} <button onClick={() => deleteMovieAction(movie)}>Usuń</button></div></div>))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    };
}

const mapDispatchToProps = {
	deleteMovieAction
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieList);