import { connect } from "react-redux";

const ToDoList = ({todos}, props) => {
    return (
        <div>
            {todos.map(todo => (<div>{todo.name}</div>))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
}

const mapDispatchToProps = {
    // deleteUserAction
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);