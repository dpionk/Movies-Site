import { useState } from "react";
import { connect } from 'react-redux';
import { Formik, Field } from "formik";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { GrAddCircle } from 'react-icons/gr'
import { RiArrowGoBackLine } from 'react-icons/ri';
import { getPersonDetails, getPersons } from '../../ducks/Persons/selectors';
import { getMovieDetails, getMoviesLoading } from "../../ducks/Movies/selectors";
import { getActorsFromMovie } from "../../ducks/Actors/selectors";
import { deleteMovie, editDirector, deleteDirector } from "../../ducks/Movies/operations";
import { deleteMovieActor, createActor } from "../../ducks/Actors/operations";

import './MovieDetails.scss'


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

function MovieDetails({ movie, deleteMovie, director, editDirector, deleteDirector, actors, deleteMovieActor, createActor, loading, persons }) {


	const history = useNavigate();
	const [editingDirector, setEditDirector] = useState(false);
	const [addingActor, setAddingActor] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false)


	function handleSubmitDirector(director_id) {
		editDirector(movie, director_id)
		setEditDirector(false)
	}

	function handleSubmitActor(actor_id) {
		createActor(movie, actor_id)
		setAddingActor(false)
	}
	const handleClick = () => {
		history(-1)
	}

	function handleDelete(movie) {
		deleteMovie(movie, actors, history)
	}

	const handleValidate = (values) => {
		const errors = {};

		if (values.id === '') {
			errors.id = 'Nie ma więcej aktorów do dodania'
		}

		return errors
	}

	const actorsToShow = actors.map((actor) => {
		return <div key={actor.id}> <Link to={`/persons/${actor.id}`} style={{ textDecoration: 'none', color: 'gray' }}>{actor.first_name} {actor.last_name}</Link><button className='btn' onClick={() => deleteMovieActor(movie, actor)}><AiFillDelete /></button> </div>
	})


	const personsToChooseFromDirector = persons.filter((person) => person.id !== director.id).map((person) => {
		return (
			<option key={person.id} value={JSON.stringify(person.id)}>{person.first_name} {person.last_name}</option>
		)
	})

	const personsToChooseFromActor = persons.filter((person) => !actors.find((actor) => actor.id === person.id)).map((person) => {
		return (
			<option key={person.id} value={JSON.stringify(person.id)}>{person.first_name} {person.last_name}</option>
		)
	})


	return (

		<div>
			{!loading && !movie && "Nie ma takiego filmu"}
			{loading && "Ładowanie..."}
			{movie && director && actors && persons &&
				<div className="movie-detailed">
					<div className="list-group-detailed" key={movie.id}>
						<div className="list-group-item">
							<div className="img-date">
								<img src={movie.image_url} alt="" />
								<div className="release-date">
									<div>
										{new Date(movie.release_date).toLocaleDateString('en-GB')}
									</div>
								</div>
							</div>
							<div className="info-buttons">
								<div className="title-author">
									<div className="title-back">
										<div className="title">
											{movie.title}
										</div>
										<div className="button-back">
											<button className="btn" type="button" onClick={handleClick}><RiArrowGoBackLine /></button>
										</div>
									</div>
									<div className="genre">
										{movie.genre}
									</div>
									<div className="description">
										{movie.description}
									</div>
								</div>
								<div className="buttons">
									{!loading && !confirmDelete && <button type='button' className='btn' onClick={() => { if (confirmDelete) { setConfirmDelete(false) } else { setConfirmDelete(true) } }}><AiFillDelete /></button>}
									{confirmDelete && <div>Na pewno?<button type='button' className='btn' onClick={() => { handleDelete(movie, actors) }} >Tak</button><button onClick={() => setConfirmDelete(false)} type='button' className='btn'>Cofnij</button></div>}
									<Link to={`/movies/edit/${movie.id}`}>
										<button type='submit' className='btn'><AiFillEdit /></button>
									</Link>
								</div>
							</div>
						</div>
						<div className="list-group-item">
							<div className='persons-container'>
								<div className="director-actors">
									<div className='director'>
										<div className='director-edit'>
											<h4>reżyser</h4>
											<button type='button' className='btn' onClick={() => {
												if (editingDirector) {
													setEditDirector(false)
												} else { setEditDirector(true) }
											}}><AiFillEdit /></button>
										</div>
										{director.hasOwnProperty('id') && !editingDirector && <div className='nav-item'><Link to={`/persons/${director.id}`} style={{ textDecoration: 'none', color: 'gray' }}>{director.first_name} {director.last_name}</Link><button className='btn' onClick={() => deleteDirector(movie)}><AiFillDelete /></button> </div>}
										{!director.hasOwnProperty('id') && !editingDirector && <div>Nie wybrano reżysera</div>}
										{editingDirector ? <div>
											<Formik
												enableReinitialize={true}
												initialValues={{ id: movie.director_id ? movie.director_id : (persons.length > 0 ? persons[0].id : '') }}
												onSubmit={handleSubmitDirector}
											>
												{(formProps) => (
													<div className='mb-2'>
														<Field as='select' name='id' className="form-select" aria-label="size 4 select">
															{movie && movie.director_id && <option value>{`${director.first_name} ${director.last_name}`}</option>}
															{personsToChooseFromDirector ? personsToChooseFromDirector : null}
														</Field>
														<button type='button' onClick={() => { formProps.handleSubmit(formProps.values.id) }} className='btn' >Zatwierdź</button>
													</div>
												)}

											</Formik></div> : null}
									</div>
									<div className='actors'>
										<h4>aktorzy</h4>
										<button type='button' className='btn' onClick={() => { if (addingActor) { setAddingActor(false) } else { setAddingActor(true) } }}><GrAddCircle /></button>
										{actors.length !== 0 && !addingActor && actorsToShow}
										{actors.length === 0 && !addingActor && <div>Nie ma jeszcze żadnych aktorów</div>}
										{addingActor ? <div>
											<Formik

												enableReinitialize={true}
												initialValues={{ id: personsToChooseFromActor.length > 0 ? personsToChooseFromActor[0].key : '' }}
												onSubmit={handleSubmitActor}
												validate={handleValidate}
											>
												{(formProps) => (
													<div className='mb-2'>
														<Field as='select' name='id' className="form-select" aria-label="size 4 select">
															{personsToChooseFromActor ? personsToChooseFromActor : null}
														</Field>
														{formProps.touched.id && formProps.errors.id ? <div>{formProps.errors.id}</div> : null}
														<button type='button' onClick={() => { formProps.handleSubmit(formProps.values.id) }} className='btn' >Zatwierdź</button>

													</div>
												)}

											</Formik></div> : null}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

const mapStateToProps = (state, props) => {
	const movie = getMovieDetails(state, props.router.params.id)
	const persons = movie ? getPersons(state) : []
	const director = movie ? getPersonDetails(state, movie.director_id) : {}
	return {
		movie: movie,
		director: director,
		persons: persons,
		actors: persons && movie ? getActorsFromMovie(state, movie.id).map((element) => {
			return getPersonDetails(state, element.person_id)
		}) : [],
		loading: getMoviesLoading(state)
	}
}

const mapDispatchToProps = dispatch => ({
	deleteMovie: deleteMovie(dispatch),
	editDirector: editDirector(dispatch),
	deleteDirector: deleteDirector(dispatch),
	deleteMovieActor: deleteMovieActor(dispatch),
	createActor: createActor(dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetails));

