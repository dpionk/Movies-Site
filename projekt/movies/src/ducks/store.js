import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import { movieReducer } from './Movies/reducer';
import { personReducer } from './Persons/reducer';
import { actorReducer } from './Actors/reducer'
import { createMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
  movies: movieReducer,
  persons: personReducer,
  actors: actorReducer
});

const store = createStore(combinedReducers, 
  composeEnhancers(applyMiddleware(thunk, createMiddleware(), logger)),
  );

  export default store;