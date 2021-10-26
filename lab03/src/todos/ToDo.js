import { connect } from "react-redux";
import { withRouter } from "react-router";


const ToDo = ({todo}, props) => {
	console.log(props.todos)
	console.log(todo)
	return (
		<div>
			{todo.name}   {todo.date}
		</div>
	)
}


const mapStateToProps = (state, props) => {
    return {
        todo: state.todos.find(todo => todo.id === props.match.params.id)
    };
}


export default withRouter(connect(mapStateToProps, null)(ToDo));