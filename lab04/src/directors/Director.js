import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';


const Director = ({director}) => {
	return (
		<div>
            
			{director.firstName}   {director.lastName} {director.age}
            <Link to={`/directors/edit/${director.id}`}>Edytuj</Link>
		</div>
	)
}


const mapStateToProps = (state, props) => {
    return {
        director: state.directors.find(director => director.id === props.match.params.id)
    };
}


export default withRouter(connect(mapStateToProps, null)(Director));