import { connect } from "react-redux";
import { doneTodoAction, deleteTodoAction } from "../actions/TodoActions";
import { Link } from 'react-router-dom';

const ToDoList = ( {todos, doneTodoAction, deleteTodoAction},  props ) => {

    return (
        <div>
            {todos.map(todo => (<div><div><Link to={`/todos/${todo.id}`}> {todo.id}  </Link> {todo.name}    {todo.date}     {todo.done ? <button onClick={() => doneTodoAction(todo)} >not done</button> : <button onClick={() => doneTodoAction(todo)}>done</button>} <button onClick={() => deleteTodoAction(todo)}>delete</button><button>Edit</button></div></div>))}
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