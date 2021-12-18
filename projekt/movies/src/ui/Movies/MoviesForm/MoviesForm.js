import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Formik, Field } from "formik";
import { RiArrowGoBackLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { createMovie } from '../../../ducks/Movies/operations';
import './MoviesForm.scss'

function MoviesForm({createMovie}) {

	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);
	const [editing, setEditing] = useState(false);
	const [adding, setAdding] = useState(false)
	const [loading, setLoading] = useState(false);
	const [bookError, setBookError] = useState(false);
	const [data, setData] = useState();

	const history = useNavigate();
	function handleClick() {
		history(-1);
	}

	const id = useParams();

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
		return errors;
	}

	useEffect(() => {
		if (id.id !== undefined) {
			setAdding(false);
			setEditing(true);
			axios.get(`http://localhost:5000/api/movies/${id.id}`).then((response) => {
				setLoading(true);
				setData(response.data)
			}).catch(() => {
				setBookError(true);
			}).finally(() => {
				setLoading(false);
			})
		}
		else {
			setEditing(false);
			setAdding(true);
		}
	}, [id])


	
	const handleSubmitEdit = (values) => {
		setPending(true);
		axios.put(`http://localhost:5000/api/movies/${id.id}`, values).then(() => {
			setPending(false);
			alert("Edycja przebiegła pomyślnie");
			history.go(-1);
		}).catch(() => {
			setPending(false);
			setError(true);
		})
	}

	const handleSubmitAdd = (values) => {
		createMovie(values)
		history('/movies');
		}

	
	return (
		<div>
			<Formik
			enableReinitialize={true}
			initialValues={
				editing && data ?
					{
						title: data.title,
						genre: data.genre,
						release_date: data.release_date.slice(0, 10),
						description: data.description,
						image_url: data.image_url
					}
					:
					{
						title: '',
						genre: '',
						release_date: '',
						description: '',
						image_url: ''
					}
			}
			validate={handleValidate}
			onSubmit={editing ? handleSubmitEdit : handleSubmitAdd}>
			{ (formProps) => (
				<div className="row justify-content-md-center">
					<div className='container-add col'>
						{bookError && <div> Nie udało się załadować danych książki</div>}
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
								<div>
									{adding && !pending && !error && <button type='button' onClick={formProps.handleSubmit} className='btn' >Dodaj</button>}
									{editing && !pending && !error && <button type='button' onClick={formProps.handleSubmit} className='btn' >Zatwierdź</button>}
									{adding && pending && !error && <button className='btn' disabled>Dodawanie książki...</button>}
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

const mapDispatchToProps = ({
    createMovie
});

export default connect(null, mapDispatchToProps)(MoviesForm);