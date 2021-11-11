import { incrementAction } from './actions'
import { connect } from 'react-redux';

const Counter = ({counter, incrementAction}) => {

	return (
		<div>
	  <div>
		  <button onClick={incrementAction}>increment</button>
	  </div>
	  <div>
		  <h3>{counter}</h3>
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
    incrementAction: state => dispatch(incrementAction(state))
});


export default connect(mapStateToProps, mapDispatchToProps)(Counter);