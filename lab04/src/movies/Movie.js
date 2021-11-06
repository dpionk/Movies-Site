import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router";


const Movie = ({movie}) => {

	const director = useSelector((state) => {
		return state.directors.find(element => 
			element.id === movie.director_id )
	})
	
	return (
		<div>
			{movie.title}   {movie.productionYear} {director ? <div>{director.firstName} {director.lastName}</div> : null }
		</div>
	)
}


const mapStateToProps = (state, props) => {
    return {
        movie: state.movies.find(movie => movie.id === props.match.params.id),
    };
}



export default withRouter(connect(mapStateToProps, null)(Movie));