import { connect } from "react-redux";
import { withRouter } from "react-router";


const Movie = ({movie}, props) => {
    console.log("hej")
	return (
		<div>
            bblfdlfdk
			{movie.title}   {movie.productionYear}
		</div>
	)
}


const mapStateToProps = (state, props) => {
    return {
        movie: state.movies.find(movie => movie.id === props.match.params.id)
    };
}


export default withRouter(connect(mapStateToProps, null)(Movie));