import { useState } from "react"
import { addTodoAction } from "./actions/TodoActions";

const TodosStore = ( {store},props) => {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState(store.getState().todos);

    store.subscribe(() => {
        console.log(store.getState().todos );
        setTodos(store.getState().todos);
    });

    return (
        <div>
            <div>
                <input type="text" value={newTodo} 
                onChange={(event) => setNewTodo(event.target.value)} />
                <button onClick={() => {
                    store.dispatch(addTodoAction({ name: newTodo }))
                }}>Zatwierdz</button>
            </div>
            <div>
                {todos.map(el => (<div>{el.name}</div>))}
            </div>
        </div>

    )
}

export default TodosStore;