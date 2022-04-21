import { Link } from 'react-router-dom';

function Movie({id, title, image_url}) {
	return (
		<li className='list-group-item'>
			<div className='image'><img src={image_url} alt='' /></div>
			<div className='title-author'>
				<Link to={`/movies/${id}`}>
					<button className='title-button'>
						{title}
					</button>
				</Link>
			</div>
		</li>
	);
}

export default Movie;