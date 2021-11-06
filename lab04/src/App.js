import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Dashboard from './movies/Dashboard';
import DirectorForm from './directors/DirectorForm'
import MovieForm from './movies/MovieForm';
import MovieList from './movies/MovieList';
import ActorList from './actors/ActorList';
import Navbar from './Navbar';
import Movie from './movies/Movie';
import DirectorList from './directors/DirectorList';
import Director from './directors/Director';

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
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
