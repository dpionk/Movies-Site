import { Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getProductList, deleteProduct } from "../../ducks/products/operations";
import { getProducts } from "../../ducks/products/selectors";

const ProductList = ({ products, getProductList, deleteProduct } ,props) => {
    useEffect(() => {
        getProductList();
    }, []);


	console.log(products)
    return (
        <div>
            <h3>Products list</h3>
			<h4>Filter by category</h4>
			<div>
				<h4>
				<Link to='/products/add'>
					Add product
					</Link>
					</h4>
			</div>
            {
                products.map(product => {
                    return (
                    <div>
						<Link to={`/products/${product.id}`}>
                        {product.title}
						</Link>
						<button onClick={() => deleteProduct(product)}>delete</button>
                    </div>)
                    })
            }
        </div>
    )
};
const mapStateToProps = (state) => {
    return {
        products: getProducts(state)
    };
}
const mapDispatchToProps = {
    getProductList,
	deleteProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);