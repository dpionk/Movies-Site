import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import UserList from './ui/users/UserList'
import UserDetails from './ui/users/UserDetails'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path = {['/', '/users']}>
          <UserList/>
        </Route>
        <Route exact path = '/users/:id'>
          <UserDetails/>
        </Route>
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
