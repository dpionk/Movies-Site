import { Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getProductList } from "../../ducks/products/operations";
import { getProducts } from "../../ducks/products/selectors";

const ProductList = ({ products, getProductList } ,props) => {
    useEffect(() => {
        getProductList();
    }, []);

	console.log(products)
    return (
        <div>
            <h3>Products list</h3>
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
						<button>delete</button>
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
    getProductList
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);