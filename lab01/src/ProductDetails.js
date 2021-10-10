import { useParams } from "react-router-dom"
import axios from 'axios';
import { useState, useEffect } from "react";

function ProductDetails({ pobierz }) {
	
	const { id } = useParams();
	const [product, setProduct] = useState();

	const pobierzProdukt = (id) => {
		axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
			console.log(response)
			setProduct(response.data[id - 1])
		}).catch((error) => {
			console.log(error)
		})
	}

	useEffect((id) => {
		console.log("sdgsrdk")
		axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
			console.log(response)
			setProduct(response.data[id - 1])
		}).catch((error) => {
			console.log(error)
		})
	}, [id]
	);
	

	return (
		<div>
			chuj kuirwa
			{id}
			{/*{data && <div><div>{data.title}</div>
			<div>{data.title}</div></div>}*/}
		</div>
	)
}

export default ProductDetails;