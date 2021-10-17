import ProductInList from './ProductInList'

function ProductList({products}) {
	 
	const ProductsList = products.map((product) => {
		const productInList =  <ul key={product.id}><ProductInList id={product.id} title={product.title} price={product.price} category={product.category}></ProductInList></ul>
		return productInList
	  })
	  
	return (
		<div>
			{ProductsList}
		</div>
	)
}

export default ProductList;