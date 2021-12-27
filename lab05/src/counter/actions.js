export const INCREASE_COUNTER_VALUE = 'INCREASE_COUNTER_VALUE';
export const DECREMENT_COUNTER_VALUE = 'DECREMENT_COUNTER_VALUE';

export const incrementAction = () => ({
    type: 'INCREASE_COUNTER_VALUE',
});

export const decrementAction = () => ({
    type: 'DECREMENT_COUNTER_VALUE',
});