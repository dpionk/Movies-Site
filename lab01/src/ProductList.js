function ProductList({products}) {
	 
	const ProductsList = products.map((product) => {
		const productInList = <ul><li>
		  {product.id}<li>{product.title} </li><li>{product.price} </li><li>{product.category} </li>
		</li>
		</ul>
	  
		return productInList
	  })
	  
	return (
		<div>
			{ProductsList}
		</div>
	)
}

export default ProductList;