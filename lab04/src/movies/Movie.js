import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router";


const Movie = ({movie, actorsID, actors}) => {

	const director = useSelector((state) => {
		return state.directors.find(element => 
			element.id === movie.director_id )
	});

	const containsObject = ((obj) => {
		let i;
		for (i = 0; i < actorsID.length; i++) {
			if (actorsID[i]["actorID"] === obj.id) {
				return true;
			}
		}
		return false;
	});

	const actorsNames = actors.filter((actor) => {
		return containsObject(actor);
	})

	return (
		<div>
			{movie.title}   {movie.productionYear} {director ? <div><div> Reżyser: </div> <div>{director.firstName} {director.lastName}</div> </div>: <div> Nie wybrano reżysera </div> }
			<div>
				<div>
					Aktorzy:
				{actors ? <div> {actorsNames.map((element) => <div> {element.firstName} {element.lastName} </div>)} </div> : <div>Nie wybrano aktorów</div>}
				</div>
				</div>
		</div>
	)
}


const mapStateToProps = (state, props) => {
    return {
        movie: state.movies.find(movie => movie.id === props.match.params.id),
		actorsID: state.actorsInMovies.filter(element => {
			return element.movieID === props.match.params.id
		}),
		actors: state.actors
    };
}



export default withRouter(connect(mapStateToProps, null)(Movie));