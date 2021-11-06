import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Dashboard from './movies/Dashboard';
import DirectorForm from './directors/DirectorForm'
import DirectorList from './directors/DirectorList';
import Director from './directors/Director';
import Movie from './movies/Movie';
import MovieForm from './movies/MovieForm';
import MovieList from './movies/MovieList';
import ActorList from './actors/ActorList';
import ActorForm from './actors/ActorForm';
import Actor from './actors/Actor';
import Navbar from './Navbar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path = '/'>
          <Dashboard/>
        </Route>
        <Route exact path='/movies'>
          <MovieList/>
        </Route>
        <Route exact path='/movies/add'>
            <MovieForm/>
        </Route>
        <Route exact path='/movies/:id'>
          <Movie/>
        </Route>
        <Route exact path='/directors'>
          <DirectorList/>
        </Route>
        <Route exact path={['/directors/edit/:id', '/directors/add' ]}>
            <DirectorForm/>
        </Route>
        <Route exact path='/directors/:id'>
          <Director/>
        </Route>
		<Route exact path='/actors'>
          <ActorList/>
        </Route>
		<Route exact path={['/actors/edit/:id', '/actors/add']}>
          <ActorForm/>
        </Route>
		<Route exact path='/actors/:id'>
          <Actor/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
