import { decrementAction, incrementAction } from './actions'
import { connect } from 'react-redux';

const Counter = ({counter, incrementAction, decrementAction}) => {

	return (
		<div>
	  <div>
		  <button onClick={incrementAction}>increment</button>
	  </div>
	  <div>
		  <button onClick={decrementAction}>decrement</button>
	  </div>
	  <div>
		  <button>Start decrementing</button>
	  </div>
	  <div>
		  <button>Stop decrementing</button>
	  </div>
	  <div>
		  <h2>{counter}</h2>
	  </div>
	  </div>
	);
  }
  

  const mapStateToProps = (state) => {
    return {
        counter: state.counter.counter
    }
};

const mapDispatchToProps = dispatch =>  ({
    incrementAction: state => dispatch(incrementAction(state)),
	decrementAction: state => dispatch(decrementAction(state))
});


export default connect(mapStateToProps, mapDispatchToProps)(Counter);