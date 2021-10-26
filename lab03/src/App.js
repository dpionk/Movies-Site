import './App.css';
import TodoForm from './todos/TodoForm';
import ToDoList from './todos/ToDoList';
import ToDo from './todos/ToDo';
import NoteForm from './notes/NoteForm';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import NoteList from './notes/NoteList';
import Note from './notes/Note';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Link to='/todos/add'>
					Add todo
				</Link>
				<div>
					<Link to='/todos'>
						Todos
					</Link>
				</div>
				<div>
					<Link to='/notes'>
						Notes
					</Link>
				</div>
				<div>
					<Link to='/notes/add'>
						Add Note
					</Link>
				</div>
				<Switch>
					<Route exact path='/todos'>
						<ToDoList />
					</Route>
					<Route exact path='/todos/add'>
						<TodoForm />
					</Route>
					<Route exact path='/todos/:id'>
						<ToDo />
					</Route>
					<Route exact path='/notes/add'>
						<NoteForm />
					</Route>
					<Route exact path='/notes'>
						<NoteList/>
					</Route>
					<Route exact path='/notes/:id'>
						<Note />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
