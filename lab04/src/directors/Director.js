import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';


const Director = ({director}, props) => {
	return (
		<div>
            
			{director.firstName}   {director.lastName} {director.age}
            <Link to={`/directors/${director.id}/edit`}>Edytuj</Link>
		</div>
	)
}


const mapStateToProps = (state, props) => {
    return {
        director: state.directors.find(director => director.id === props.match.params.id)
    };
}


export default withRouter(connect(mapStateToProps, null)(Director));