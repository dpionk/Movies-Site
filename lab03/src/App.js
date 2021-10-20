import './App.css';
import TodoForm from './todos/TodoForm';
import ToDoList from './todos/ToDoList';

function App() {
  return (
    <div className="App">
      <TodoForm/>
      <ToDoList/>
    </div>
  );
}

export default App;
