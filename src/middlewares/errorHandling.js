import {
    isRSAA,
    RSAA
} from 'redux-api-middleware'

const errorHandling = store => next => (action) => {

    console.log('aaaa', action[RSAA])
    if (!isRSAA(action)) {
        return next(action);
    }


    const onSuccess = action[RSAA].onSuccess ? action[RSAA].onSuccess : null
    const onFailure = action[RSAA].onFailure ? action[RSAA].onFailure : null
    const rsaaAction = action[RSAA]

    if (!onSuccess && !onFailure) {
        return next((rsaaAction));
    }

    return (async () => {
        const response = await next((rsaaAction));
        if (response.error && onFailure && !response.payload.body) {
            onFailure();
        } else if (response.error && onFailure && response.payload.body) {
            alert('Nie można dodać kolejnego filmu o takim samym tytule')
        } else if (onSuccess) {
            onSuccess();
        }
        return response;
    })();
};

export default errorHandling;