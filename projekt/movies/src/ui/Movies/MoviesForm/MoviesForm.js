import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Formik, Field } from "formik";
import { RiArrowGoBackLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { getMovieDetails, getMoviesLoading } from "../../../ducks/Movies/selectors";
import { getPersons, getPersonDetails } from "../../../ducks/Persons/selectors";
import { createMovie, editMovie } from '../../../ducks/Movies/operations';
import './MoviesForm.scss'

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


function MoviesForm({ createMovie, editMovie, movie, persons, director, pending }) {
	const [editing, setEditing] = useState(false);
	const [adding, setAdding] = useState(false)
	const re = /https?:\/\/.*\.(?:png|jpg)/
	const genres = [ 'horror', 'melodramat', 'sensacja', 'kryminalny', 'biograficzny', 'thriller', 'musical', 'przygodowy', 'historyczny', 'sci-fi', 'fantasy', 'western', 'dokumentalny', 'katastroficzny', 'komedia romantyczna', 'komedia']

	const history = useNavigate();
	function handleClick() {
		history(-1);
	}
	const handleValidate = (values) => {
		const errors = {};

		if (!values.title) {
			errors.title = "Tytuł nie może być pusty"
		}
		if (!values.release_date) {
			errors.release_date = "Data jest wymagana"
		} else if (Date.parse(values.release_date) > Date.now()) {
			errors.release_date = "Data nie może być późniejsza"
		}

		if (!values.description) {
			errors.description = "Opis nie może być pusty"
		}
		if (!values.image_url) {
			errors.image_url = "Link nie może być pusty"
		}

		else if (!re.exec(values.image_url)) {
			errors.image_url = "Niepoprawny link"
		}

		return errors;
	}

	useEffect(() => {
		if (movie) {
			setAdding(false);
			setEditing(true);
		}
		if (!movie) {
			setEditing(false);
			setAdding(true);
		}
	}, [movie])



	const handleSubmitEdit = (values) => {
		
		if (values.director_id === "") {
			values.director_id = null
		}
		else {
			values.director_id = parseInt(values.director_id)
		}
		editMovie(values,history)
	}


	const handleSubmitAdd = (values) => {
		values.director_id = values.director_id ? parseInt(values.director_id) : null
		createMovie(values,history)
	}

	const personsToShow = persons.filter((person) => person.id !== director.id).map((person) => {
		return (
				<option key={person.id} value={JSON.stringify(person.id)}>{person.first_name} {person.last_name}</option>
		)
	})

	const genresToShow = genres.map((genre) => {
		return (
			<option key={genre} value={genre}>{genre}</option>
	)
	})

	return (
		<div>
			<Formik
				enableReinitialize={true}
				initialValues={
					editing && movie ?
						{
							id: movie.id,
							title: movie.title,
							genre: movie.genre,
							release_date: movie.release_date.slice(0, 10),
							description: movie.description,
							image_url: movie.image_url,
							director_id: movie.director_id ? movie.director_id : ''
						}
						:
						{
							title: '',
							genre: genres[0],
							release_date: '',
							description: '',
							image_url: '',
							director_id: ''
						}
				}
				validate={handleValidate}
				onSubmit={editing ? handleSubmitEdit : handleSubmitAdd}>
				{(formProps) => (
					<div className="row justify-content-md-center">
						<div className='container-add col'>
							{pending && <div>Ładowanie...</div>}
							<div className='button-back'>
								<button className='btn btn-primary' type='button' onClick={handleClick}><RiArrowGoBackLine /></button>
							</div>
							<div className='form'>
								<form className='add-movie'>
									{editing ? <h2>Edytuj film</h2> : <h2>Dodaj film</h2>}
									<div className='mb-2'>
										<label className='form-label'>Tytuł</label>
										<Field type='text' className='form-control' name='title' value={formProps.values.title ? formProps.values.title : ''}>
										</Field>
										{formProps.touched.title && formProps.errors.title ? <div className="error">{formProps.errors.title}</div> : null}
									</div>
									<div className='mb-2'>
										<label className='form-label'>Gatunek</label>
										<Field as='select' name='genre' className="form-select mb-3" aria-label="select" value={formProps.values.genre ? formProps.values.genre : ''}>
										{genresToShow}
										</Field>
									</div>
									<div className='mb-2'>
										<label className='form-label'>Data premiery</label>
										<Field type='date' className='form-control' name='release_date' value={formProps.values.release_date ? formProps.values.release_date : ''}>
										</Field>
										{formProps.touched.release_date && formProps.errors.release_date ? <div className="error">{formProps.errors.release_date}</div> : null}
									</div>
									<div className='mb-2'>
										<label className='form-label'>Opis</label>
										<Field component='textarea' className='form-control' name='description' value={formProps.values.description ? formProps.values.description : ''}>
										</Field>
										{formProps.touched.description && formProps.errors.description ? <div className="error">{formProps.errors.description}</div> : null}
									</div>
									<div className='mb-2'>
										<label className='form-label'>Link do obrazka</label>
										<Field type='text' className='form-control' name='image_url' value={formProps.values.image_url ? formProps.values.image_url : ''}>
										</Field>
										{formProps.touched.image_url && formProps.errors.image_url ? <div className="error">{formProps.errors.image_url}</div> : null}
									</div>
									<div className='mb-2'>
									<label className='form-label'>{movie ? 'reżyser' : 'reżyser (opcjonalnie)' }</label>
										<Field as='select' name='director_id' className="form-select" aria-label="select" value={formProps.values.director_id ? formProps.director_id : ''}>
											{ movie && movie.director_id && director ? <option value>{ `${director.first_name} ${director.last_name}`}</option> : <option value></option> }
											{personsToShow ? personsToShow : null }
										</Field>
									</div>
									<div>
										{adding && !pending && <button type='button' onClick={formProps.handleSubmit} className='btn' >Dodaj</button>}
										{editing && !pending && <button type='button' onClick={formProps.handleSubmit} className='btn' >Zatwierdź</button>}
										{adding && pending && <button className='btn' disabled>Dodawanie filmu...</button>}
										{editing && pending && <button className='btn' disabled>Zmieniam  dane..</button>}
									</div>
								</form>
							</div>
						</div>
					</div>
				)}
			</Formik>

		</div>
	)
}

const mapStateToProps = (state, props) => {
	const movie = getMovieDetails(state, props.router.params.id)
	const director = movie ? getPersonDetails(state,movie.director_id) : {}
	return {
		movie: movie,
		persons: getPersons(state),
		director: director,
		pending: getMoviesLoading(state)
	}
}

const mapDispatchToProps = dispatch => ({
	createMovie: createMovie(dispatch),
	editMovie: editMovie(dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesForm));