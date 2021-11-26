import types from './types';

export const cartDeleteAction = (cart) => ({
	type: types.CART_DELETE,
	payload: cart
})