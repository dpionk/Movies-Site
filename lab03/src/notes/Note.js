import { connect } from "react-redux";
import { withRouter } from "react-router";


const Note = ({note}, props) => {
	return (
		<div>
			{note.text} 
		</div>
	)
}


const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note.id === props.match.params.id)
    };
}


export default withRouter(connect(mapStateToProps, null)(Note));