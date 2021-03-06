import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getMovieList } from '../../ducks/Movies/operations';
import { getPersonList } from '../../ducks/Persons/operations';
import { getActorList } from '../../ducks/Actors/operations'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Main from '../Main/Main';
import Navbar from '../Navbar/Navbar';
import Movies from '../Movies/Movies';
import MovieDetails from '../Movies/MovieDetails'
import MoviesForm from '../Movies/MoviesForm/MoviesForm'
import Persons from '../Persons/Persons';
import PersonDetails from '../Persons/PersonDetails';
import PersonsForm from '../Persons/PersonsForm/PersonsForm';
import PageNotFound from '../PageNotFound/PageNotFound'
import './App.scss'


function App({ getMovieList, getPersonList, getActorList }) {


	useEffect(() => {
		getMovieList();
		getPersonList();
		getActorList();
	}, [getMovieList, getPersonList, getActorList]);

	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<div className='container'>
					<Routes>
						<Route exact path='/' element={<Main />} />
						<Route exact path='/movies/page/:id' element={<Movies />} />
						<Route exact path='/movies/:id' element={<MovieDetails />} />
						<Route exact path='/movies/add' element={<MoviesForm />} />
						<Route exact path='/movies/edit/:id' element={<MoviesForm />} />
						<Route exact path='/persons/page/:id' element={<Persons />} />
						<Route exact path='/persons/:id' element={<PersonDetails />} />
						<Route exact path='/persons/add' element={<PersonsForm />} />
						<Route exact path='/persons/edit/:id' element={<PersonsForm />} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

const mapDispatchToProps = dispatch => ({
	getMovieList: getMovieList(dispatch),
	getPersonList: getPersonList(dispatch),
	getActorList: getActorList(dispatch)
})

export default connect(null, mapDispatchToProps)(App);
