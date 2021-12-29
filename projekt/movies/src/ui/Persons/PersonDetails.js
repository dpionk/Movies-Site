import { useState } from 'react';
import { connect } from 'react-redux';
import { getMoviesWhereDirected, getMoviesWhereActed, getMovieDetails  } from '../../ducks/Movies/selectors';
import { getPersonDetails } from '../../ducks/Persons/selectors';
import { deletePerson} from '../../ducks/Persons/operations';
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

function PersonDetails ({person, deletePerson, moviesDirected, moviesActed, movies}) {

	function handleDelete(person, movies) {
		 deletePerson(person, movies)
		 alert('Usunięto')
		history('/persons/page/1')
		
	}

	console.log(person)
	console.log(moviesDirected)

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
			{person  && moviesDirected &&
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
									{!deleting && !error && <button type='button' className='btn' onClick={() => handleDelete(person, moviesDirected)}><AiFillDelete/></button>}
									<Link to={`/persons/edit/${person.id}`}>
										<button type='submit' className='btn'><AiFillEdit/></button>
									</Link>
									{deleting && !error && <button className='btn' disabled>Usuwanie...</button>}
									{errorDelete && <button className='btn' disabled>Coś poszło nie tak....</button>}
								</div>
							</div>
						</div>
						<div className="list-group-item">
							<div className='directed-acted-in'>
								<div className='movies-directed'>
								<h4>wyreżyserowane filmy</h4>
								{moviesDirected.length !== 0 ? moviesDirected.map((movie) => { return <li key={movie.id}><Link style={{ textDecoration: 'none', color: 'gray'}} to={`/movies/${movie.id}`}>{movie.title}</Link></li>
								}) : <div>Brak filmów</div>}
								</div>
								<div className='movies-acted-in'>
								<h4>występował/a w</h4>
								{moviesActed.length !== 0 ? moviesActed.map((movie) => { return <li key={movie.id}><Link style={{ textDecoration: 'none', color: 'gray'}} to={`/movies/${movie.id}`}>{movie.title}</Link></li>
								}) : <div>Brak filmów</div>}
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
	const person = getPersonDetails(state,props.router.params.id)
	return {
		person: person,
		movies: state.movies,
		moviesDirected: person && getMoviesWhereDirected(state, person.id),
		moviesActed: person && getMoviesWhereActed(state, person.id).map((
			element => {
				return getMovieDetails(state, element.movie_id)
			}
		))
	}
}

const mapDispatchToProps = {
	deletePerson
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonDetails));

