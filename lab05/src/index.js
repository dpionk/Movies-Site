import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore, compose } from 'redux';
import { reducer } from './counter/reducer';
import  alert  from './middlewares/Alert'
import decrementing from './middlewares/Decrementing'
import { Provider } from 'react-redux';
import { createMiddleware } from 'redux-api-middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, applyMiddleware(createMiddleware(alert, decrementing)))


ReactDOM.render(
  <React.StrictMode>
	  <Provider store={store}>
    <App />
	</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
