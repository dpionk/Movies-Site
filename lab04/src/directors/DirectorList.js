import { connect } from "react-redux";
import { deleteDirectorAction } from "../actions/DirectorsActions";
import { deleteMovieAction } from "../actions/MoviesActions";
import { Link } from 'react-router-dom';

const DirectorList = ( {directors,deleteDirectorAction, movies, deleteMovieAction}, props ) => {

	const handleDelete = (director) => {
		deleteDirectorAction(director)
		movies.forEach(element => {
			if (element.director_id === director.id) {
			deleteMovieAction(element)
			}
		});
	}

    return (
        <div>
            {directors.map(director => (<div><div><Link to={`/directors/${director.id}`}> {director.firstName} {director.lastName}  </Link>  <button onClick={() => handleDelete(director)}>Usuń</button></div></div>))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        directors: state.directors,
		movies: state.movies
    };
}

const mapDispatchToProps = {
	deleteDirectorAction,
	deleteMovieAction
}


export default connect(mapStateToProps, mapDispatchToProps)(DirectorList);