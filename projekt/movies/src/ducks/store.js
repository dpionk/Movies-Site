import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { movieReducer } from './Movies/reducer';
import { personReducer } from './Persons/reducer';
import { actorReducer } from './Actors/reducer'
import  errorHandling  from '../middlewares/errorHandling';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
  movies: movieReducer,
  persons: personReducer,
  actors: actorReducer
});

const store = createStore(combinedReducers, 
  composeEnhancers(applyMiddleware(thunk,logger, errorHandling,  apiMiddleware)),
  );

  export default store;