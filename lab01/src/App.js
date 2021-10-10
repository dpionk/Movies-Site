import './App.css';
import { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import {BrowserRouter, Route} from "react-router-dom";

function App() {

  const axios = require('axios')

const [products,setProducts] = useState([]);

const pobierz = () => {axios.get('https://fakestoreapi.com/products').then((response) => {
  setProducts(response.data)
  console.log(response.data)
}).catch((error) => {
  console.log(error)
})
}

useEffect(() => {
  pobierz();

}, []
);
 
  const ProductsList = products.map((product) => {
  const productInList = <ul><li>
    {product.id}<li>{product.title} </li><li>{product.price} </li><li>{product.category} </li>
  </li>
  </ul>

  return productInList
})


  return (
    <div className="App">
		<BrowserRouter>
		<Route exact path = '/products/new'>
		<ProductForm pobierz={pobierz}/>
			</Route>
	  <Route exact patch = {[ '/', '/products']}>
      {/*{ProductsList}*/}
	  </Route>
	  <Route exact path = '/products/:id/details'>

	  </Route>
	  <Route exact path = 'products/:id/edit'>
		  
	  </Route>
		</BrowserRouter>
    <div>
      
    </div>
    </div>
  );
}

export default App;
