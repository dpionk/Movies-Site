import { useState } from 'react';
import { connect } from 'react-redux';
import { getPersonDetails } from '../../ducks/Persons/selectors';
import { deletePerson } from '../../ducks/Persons/operations';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { RiArrowGoBackLine } from 'react-icons/ri';
import './PersonDetails.scss'

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

function PersonDetails ({person, deletePerson}) {

	async function handleDelete(person) {
		await deletePerson(person)
		history('/persons')
	}

	const history = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [errorDelete, setErrorDelete] = useState(false);

	const handleClick = () => {
		history(-1)
	}

	return (
		
		<div>
			{person  &&
				<div className='person-detailed'>
					<div className='list-group-detailed' key={person.id}>
						<div className='list-group-item'>
							<div className='info-buttons'>
								<div className='title-author'>
									<div className='title-back'>
										<div className='title'>
											{person.first_name} {person.last_name}
										</div>
										<div className='button-back'>
											<button className='btn' type='button' onClick={handleClick}><RiArrowGoBackLine/></button>
										</div>
									</div>
									<div className='author'>
									</div>
									<div className='genre'>
										Data urodzenia: {new Date(person.birth_date).toLocaleDateString('en-GB')}
									</div>
									<div className='description'>
										Narodowość: {person.nationality}
									</div>
								</div>
								<div className='buttons'>
									{!deleting && !error && <button type='button' className='btn' onClick={() => handleDelete(person)}><AiFillDelete/></button>}
									<Link to={`/persons/edit/${person.id}`}>
										<button type='submit' className='btn'><AiFillEdit/></button>
									</Link>
									{deleting && !error && <button className='btn' disabled>Usuwanie...</button>}
									{errorDelete && <button className='btn' disabled>Coś poszło nie tak....</button>}
								</div>
							</div>
						</div>
					</div>
				</div>
				}
		</div>
	)
}

const mapStateToProps = (state,props) => {
	return {
		person: getPersonDetails(state,props.router.params.id)
	}
}

const mapDispatchToProps = {
	deletePerson
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonDetails));

