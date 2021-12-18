import { Link } from 'react-router-dom';

function Person({id, first_name, last_name}) {
	return (
		<li className='list-group-item'>
			<div className='title-author'>
				<Link to={`/persons/${id}`}>
					<button className='title-button'>
						{first_name} {last_name}
					</button>
				</Link>
			</div>
		</li>
	);
}

export default Person;