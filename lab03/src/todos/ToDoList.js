import { connect } from "react-redux";
import { doneTodoAction, deleteTodoAction } from "../actions/TodoActions";

const ToDoList = ( {todos, doneTodoAction, deleteTodoAction},  props ) => {

    return (
        <div>
            {todos.map(todo => (<div><div>{todo.name}    {todo.date}     {todo.done ? <button onClick={() => doneTodoAction(todo)} >not done</button> : <button onClick={() => doneTodoAction(todo)}>done</button>} <button onClick={() => deleteTodoAction(todo)}>delete</button></div></div>))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
}

const mapDispatchToProps = {
	doneTodoAction,
	deleteTodoAction
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);