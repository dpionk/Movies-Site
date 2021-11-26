import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom"
import { getUser } from "../../ducks/users/operations";
import { getProductList } from "../../ducks/products/operations";
import { getUserCart } from "../../ducks/cart/operations";
import { getUserDetails } from "../../ducks/users/selectors";
import { getProducts } from "../../ducks/products/selectors";
import { getCart } from "../../ducks/cart/selectors";
import { deleteUsertCart } from "../../ducks/cart/operations";

const UserDetails = ({user, getUser, products, getProductList, cart, deleteUsertCart}, props) => {
    const id = useParams().id;

	const [showProducts, setShowProducts] = useState(false);
	const [userCart, setUserCart] = useState([])

    useEffect(() => {
        getUser(id);
		getProductList();
		setUserCart(getUserCart(cart, id))
    }, [id]);

	if (userCart[0]) {
		var userProducts = userCart[0].cart
	}

    return (
        <div>
            <h3>{user.username}</h3>
			<div>{user.name}</div>
			<div>{user.email}</div>
			<div>{user.phone}</div>
			<h3>cart</h3>
			<button onClick={() => {if (showProducts === false) {setShowProducts(true)} else {setShowProducts(false)}}}>add to cart</button>
			<button onClick={() => {deleteUsertCart(userCart)}}>delete cart</button>
			{userProducts && userProducts.map( product => {
					return (
						<div>
							{product.productID}  quantity: {product.quantity}
						</div>)
			})}
			{
				showProducts && products ?  products.map(product => {
                    return (
                    <div>
                        {product.title}
						<button>add</button>
                    </div>)
                    })
					:
					null
			}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: getUserDetails(state),
		products: getProducts(state),
		cart: getCart(state)
    };
}
const mapDispatchToProps = {
    getUser,
	getProductList,
	getUserCart,
	deleteUsertCart
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);