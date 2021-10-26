import './App.css';
import TodoForm from './todos/TodoForm';
import ToDoList from './todos/ToDoList';
import ToDo from './todos/ToDo';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
			<Link to = '/todos/add'>
				Add todo
				</Link>
				<div>
				<Link to = '/todos'>
				Todos
				</Link>
				</div>
				<Switch>
					<Route exact path={['/', '/todos']}>
						<ToDoList />
					</Route>
					<Route exact path='/todos/add'>
						<TodoForm />
					</Route>
					<Route exact path='/todos/:id'>
						<ToDo />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
