import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';


const Actor = ({actor}) => {
	return (
		<div>
            
			{actor.firstName}   {actor.lastName} {actor.age}
		</div>
	)
}


const mapStateToProps = (state, props) => {
    return {
        actor: state.actors.find(actor => actor.id === props.match.params.id)
    };
}


export default withRouter(connect(mapStateToProps, null)(Actor));