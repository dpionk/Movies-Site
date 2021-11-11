const alertCounter = store => next => action => {
	if (action.type === 'INCREASE_COUNTER_VALUE') {
		alert("You just incremented the counter")
	  return next(action);
	}
  };

  export default alertCounter;