import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Formik, Field } from "formik";
import { RiArrowGoBackLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { getMovieDetails } from "../../../ducks/Movies/selectors";
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


function MoviesForm({createMovie, editMovie, movie}) {

	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);
	const [editing, setEditing] = useState(false);
	const [adding, setAdding] = useState(false)
	const [loading, setLoading] = useState(false);

	const history = useNavigate();
	function handleClick() {
		history(-1);
	}

	const handleValidate = (values) => {
		const errors = {};

		if (!values.title) {
			errors.title = "Tytuł nie może być pusty"
		}
		if (!values.genre) {
			errors.genre = "Gatunek nie może być pusty"
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

		else if (isNaN(Number(values.director_id)) || (values.director_id !== "" && isNaN(parseInt(values.director_id)))) {
			errors.director_id = "Podano złe id"
		}

		return errors;
	}

	useEffect(() => {
		if (movie !== undefined) {
			setAdding(false);
			setEditing(true);
		}
		else {
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
	console.log(values)
	editMovie(values)
		
	}

	const handleSubmitAdd = (values) => {
		if (values.director_id === "") {
			values.director_id = null
		}
		else {
			values.director_id = parseInt(values.director_id)
		}
		console.log(values)
		createMovie(values)
		}

	
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
						director_id: movie.director_id ? movie.director_id : null
					}
					:
					{
						title: '',
						genre: '',
						release_date: '',
						description: '',
						image_url: '',
						director_id: ''
					}
			}
			validate={handleValidate}
			onSubmit={editing ? handleSubmitEdit : handleSubmitAdd}>
			{ (formProps) => (
				<div className="row justify-content-md-center">
					<div className='container-add col'>
						{loading && <div>Ładowanie...</div>}
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
									<Field type='text' className='form-control' name='genre' value={formProps.values.genre ? formProps.values.genre : ''}>
									</Field>
									{formProps.touched.genre && formProps.errors.genre ? <div className="error">{formProps.errors.genre}</div> : null}
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
									<label className='form-label'>Id reżysera (opcjonalnie)</label>
									<Field type='text' className='form-control' name='director_id' value={formProps.values.director_id ? formProps.values.director_id : ''}>
									</Field>
									{formProps.touched.director_id && formProps.errors.director_id ? <div className="error">{formProps.errors.director_id}</div> : null}

								</div>
								<div>
									{adding && !pending && !error && <button type='button' onClick={formProps.handleSubmit} className='btn' >Dodaj</button>}
									{editing && !pending && !error && <button type='button' onClick={formProps.handleSubmit} className='btn' >Zatwierdź</button>}
									{adding && pending && !error && <button className='btn' disabled>Dodawanie filmu...</button>}
									{editing && pending && !error && <button className='btn' disabled>Zmieniam  dane..</button>}
									{error && <button className='btn' disabled>Coś poszło nie tak....</button>}
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

const mapStateToProps = (state,props) => {
	return {
		movie: getMovieDetails(state,props.router.params.id)
	}
}

const mapDispatchToProps = ({
    createMovie,
	editMovie
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoviesForm));