import {Link} from 'react-router-dom'

function productInList({id, title, price, category}) {
	return (
		<div>
			<li>			
				{id}</li><li><Link to={`/products/${id}/details`}>{title}</Link></li><li>{price} </li><li>{category}
			</li>			
		</div>
	)
}

export default productInList;