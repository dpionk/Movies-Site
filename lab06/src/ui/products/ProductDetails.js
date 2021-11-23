import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom"
import { getProduct } from "../../ducks/products/operations";
import { getProductDetails } from "../../ducks/products/selectors";

const ProductDetails = ({product, getProduct}, props) => {
    const id = useParams().id;

    useEffect(() => {
        getProduct(id);
    }, [id]);

	
    return (
        <div>
			<img src={`${product.image}`}/>
            <h3>{product.title}</h3>
			<div>{product.price}</div>
			<div>{product.description}</div>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        product: getProductDetails(state, props),
    };
}
const mapDispatchToProps = {
    getProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);