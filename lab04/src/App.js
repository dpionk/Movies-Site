import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Dashboard from './movies/Dashboard';
import DirectorForm from './directors/DirectorForm'
import MovieForm from './movies/MovieForm';
import MovieList from './movies/MovieList';
import Navbar from './Navbar';
import Movie from './movies/Movie';
import DirectorList from './directors/DirectorList';

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
        <Route exact path='movies/:id'>
          <Movie/>
        </Route>
        <Route exact path='/directors'>
          <DirectorList/>
        </Route>
        <Route exact path='/directors/add'>
            <DirectorForm/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
