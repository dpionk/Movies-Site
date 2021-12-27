import './App.css';
import TodoForm from './todos/TodoForm';
import ToDoList from './todos/ToDoList';
import ToDo from './todos/ToDo';
import NoteForm from './notes/NoteForm';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NoteList from './notes/NoteList';
import Note from './notes/Note';

function App() {
	const { t } = useTranslation('pl');

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
						{t('add_note')}
					</Link>
				</div>
				<Switch>
					<Route exact path='/todos'>
						<ToDoList />
					</Route>
					<Route exact path={['/todos/add', '/todos/:id/edit']}>
						<TodoForm />
					</Route>
					<Route exact path='/todos/:id'>
						<ToDo />
					</Route>
					<Route exact path={['/notes/add', '/notes/:id/edit']}>
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
