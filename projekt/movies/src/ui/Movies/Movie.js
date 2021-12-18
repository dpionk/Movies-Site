import { Link } from 'react-router-dom';

function Movie({id, title, director, image_url}) {
	return (
		<li className='list-group-item'>
			<img src={image_url} alt='' />
			<div className='title-author'>
				<Link to={`/movies/${id}`}>
					<button className='title-button'>
						{title}
					</button>
				</Link>
				<div className='author'>
					{director}
				</div>
			</div>
		</li>
	);
}

export default Movie;