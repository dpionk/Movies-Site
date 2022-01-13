import { isRSAA, RSAA } from 'redux-api-middleware'

const errorHandling = store => next => (action) => {

	console.log('aaaa', action[RSAA])
	if(!isRSAA(action)) {
		return next(action);
	}


	const onSuccess = action[RSAA].onSuccess ? action[RSAA].onSuccess : null
	const onFailure = action[RSAA].onFailure ? action[RSAA].onFailure : null 
	const rsaaAction = action[RSAA]

	if(!onSuccess && !onFailure) {
		return next((rsaaAction));
	}

	return (async() => {
		const response = await next((rsaaAction));
		console.log(response)
		if(response.error && onFailure) {
			onFailure();
		} else if(onSuccess) {
			onSuccess();
		}
		return response;
	})();
};

export default errorHandling;