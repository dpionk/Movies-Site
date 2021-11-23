import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import UserList from './ui/users/UserList'
import UserDetails from './ui/users/UserDetails'
import Dashboard from './ducks/Dashboard';
import ProductList from './ui/products/ProductList';
import ProductForm from './ui/products/ProductForm';
import ProductDetails from './ui/products/ProductDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path = '/users'>
          <UserList/>
        </Route>
        <Route exact path = '/users/:id'>
          <UserDetails/>
        </Route>
		<Route exact path = '/products'>
			<ProductList/>
		</Route>
		<Route exact path = '/products/:id'>
			<ProductDetails/>
		</Route>
		<Route exact path = '/products/add'>
			<ProductForm/>
		</Route>
		<Route exact path = '/'>
          <Dashboard/>
        </Route>
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
