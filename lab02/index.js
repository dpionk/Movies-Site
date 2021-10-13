import { combineReducers } from 'redux'
import todos from './todos'
import notes from './counter'

export default combineReducers({
  todos,
  notes
})