import * as actions from './actions';

export const getUserCart = (carts, id) => {
    return carts.filter((el) => {
		return `${el.userID}` === id
	})
}

export const deleteUsertCart = (cartToDelete) => {
	return dispatch => {
	dispatch(actions.cartDeleteAction(cartToDelete));
	}
}