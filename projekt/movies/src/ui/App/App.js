import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Movies from '../Movies/Movies';
import MovieDetails from '../Movies/MovieDetails'
import MoviesForm from '../Movies/MoviesForm/MoviesForm'
import Persons from '../Persons/Persons';
import PersonDetails from '../Persons/PersonDetails';
import PersonsForm from '../Persons/PersonsForm/PersonsForm';
import PageNotFound from '../PageNotFound/PageNotFound'
import './App.scss'


function App() {
  return (
	  <BrowserRouter>
    <div>
		<Navbar/>
		<div className='container'>
			<Routes>
				<Route exact path='/movies' element={<Movies/>}/>
				<Route exact path='/movies/:id' element={<MovieDetails/>}/>
				<Route exact path='/movies/add' element={<MoviesForm/>}/>
				<Route exact path='/persons' element={<Persons/>}/>
				<Route exact path='/persons/:id' element={<PersonDetails/>}/>
				<Route exact path='/persons/add' element={<PersonsForm/>}/>
				<Route path='*' element={<PageNotFound/>}/>
			</Routes>
		</div>
    </div>
	</BrowserRouter>
  );
}

export default App;
