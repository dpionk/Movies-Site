import { useParams } from "react-router-dom"
import axios from 'axios';
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import Item from "./Item";
import { ConfirmProvider } from 'material-ui-confirm';

function ProductDetails() {
	
	const { id } = useParams();
	const [product, setProduct] = useState();
	useEffect(() => {
		axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
			setProduct(response.data)
		}).catch((error) => {
			console.log(error)
		})
	}, [id]
	);


	return (
		<div>
			{product &&
			<div>
			<div>
				<img src ={product.image} alt="new"/>
			</div>
			<div>
				{product.title}
			</div>
			<div>
				{product.price}
			</div>
			<div>
				{product.description}
			</div>
			<div>
				{product.category}
				</div>
				<div>
					<ConfirmProvider>
				<Item/>
				</ConfirmProvider>
				<Link to={`/products/${id}/edit`}><button>Edytuj</button></Link>
				</div>
			</div>	}
		</div>
	)
}

export default ProductDetails;