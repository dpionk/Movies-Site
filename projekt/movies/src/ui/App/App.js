import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { getMovieList } from '../../ducks/Movies/operations';
import { getPersonList } from '../../ducks/Persons/operations';
import { getActorList } from '../../ducks/Actors/operations'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
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


function App({getMovieList, getPersonList, getActorList}) {

	const [loadingMovies, setLoadingMovies] = useState(false);
	const [loadingPersons, setLoadingPersons] = useState(false)
	
	useEffect(() => {
        getMovieList(setLoadingMovies);
		getPersonList(setLoadingPersons);
		getActorList();
    }, [getMovieList, getPersonList, getActorList]);

  return (
	  <BrowserRouter>
    <div>
		<Navbar/>
		<div className='container'>
			<Routes>
				<Route exact path='/' element={<Main/>}/>
				<Route exact path='/movies/page/:id' element={<Movies loading={loadingMovies}/>}/>
				<Route exact path='/movies/:id' element={<MovieDetails loading={loadingMovies}/>}/>
				<Route exact path='/movies/add' element={<MoviesForm />}/>
				<Route exact path='/movies/edit/:id' element={<MoviesForm loading={loadingMovies}/>}/>
				<Route exact path='/persons/page/:id' element={<Persons loading={loadingPersons}/>}/>
				<Route exact path='/persons/:id' element={<PersonDetails loading={loadingPersons}/>}/>
				<Route exact path='/persons/add' element={<PersonsForm/>}/>
				<Route exact path='/persons/edit/:id' element={<PersonsForm loading={loadingPersons}/>}/>
				<Route path='*' element={<PageNotFound/>}/>
			</Routes>
		</div>
    </div>
	</BrowserRouter>
  );
}

const mapDispatchToProps = {
	getMovieList,
	getPersonList,
	getActorList
}

export default connect(null, mapDispatchToProps)(App);
