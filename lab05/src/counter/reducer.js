import { INCREASE_COUNTER_VALUE, DECREMENT_COUNTER_VALUE } from './actions';

const counterInitialState = {
	counter: 0
  };
  
  export const reducer = (state=counterInitialState, action) => {
	switch(action.type) {
		case INCREASE_COUNTER_VALUE:
			return {counter: state.counter + 1}
		case DECREMENT_COUNTER_VALUE:
			return {counter: state.counter - 1}
		default:
			return state;
	}
}