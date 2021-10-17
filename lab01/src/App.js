import './App.css';
import { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ProductDetails from './ProductDetails';
import ProductList from './ProductList';

function App() {

  const axios = require('axios')

const [products,setProducts] = useState([]);

const pobierz = () => {axios.get('https://fakestoreapi.com/products').then((response) => {
  setProducts(response.data)
}).catch((error) => {
  console.log(error)
})
}

useEffect(() => {
  pobierz();

}, []
);


  return (
    <div className="App">
		<BrowserRouter>
		<Switch>
		<Route exact path = {['/products/new', '/products/:id/edit']}>
		<ProductForm pobierz={pobierz}></ProductForm>
		</Route>
	  <Route exact patch = {['/products', '/']}>
		  <ProductList products={products}/>
	  </Route>
	  <Route exact path = '/products/:id/details'>
		  <ProductDetails/>
	  </Route>
	  <Route exact path = '*'>
		  <div>
			  Nie ma takiej strony
		  </div>
	  </Route>
	  </Switch>
		</BrowserRouter>
    <div>
      
    </div>
    </div>
  );
}

export default App;
