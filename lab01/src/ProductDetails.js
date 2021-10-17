import { useParams } from "react-router-dom"
import axios from 'axios';
import { useState, useEffect } from "react";

function ProductDetails() {
	
	const { id } = useParams();
	console.log(id)
	const [product, setProduct] = useState();

	useEffect(() => {
		axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
			console.log(response.data)
			setProduct(response.data[id - 1])
		}).catch((error) => {
			console.log(error)
		})
	}, [id]
	);
	

	return (
		<div>
			{product.title}
		</div>
	)
}

export default ProductDetails;