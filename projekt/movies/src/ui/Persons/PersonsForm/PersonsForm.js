import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Formik, Field } from "formik";
import { RiArrowGoBackLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { createPerson } from '../../../ducks/Persons/operations';
import './PersonsForm.scss'

function PersonsForm({createPerson}) {

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

		if (!values.first_name) {
			errors.first_name = "Imię nie może być puste"
		}
		if (!values.last_name) {
			errors.last_name = "Name nie może być puste"
		}
		if (!values.birth_date) {
			errors.birth_date = "Data jest wymagana"
		} else if (Date.parse(values.birth_date) > Date.now()) {
			errors.birth_date = "Data nie może być późniejsza"
		}

		if (!values.nationality) {
			errors.nationality = "Narodowość nie może być pusta"
		} 
		return errors;
	}

	useEffect(() => {
		if (id.id !== undefined) {
			setAdding(false);
			setEditing(true);
			axios.get(`http://localhost:5000/api/persons/${id.id}`).then((response) => {
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
		axios.put(`http://localhost:5000/api/persons/${id.id}`, values).then(() => {
			setPending(false);
			alert("Edycja przebiegła pomyślnie");
			history.go(-1);
		}).catch(() => {
			setPending(false);
			setError(true);
		})
	}

	const handleSubmitAdd = (values) => {
		createPerson(values)
		history('/persons');
		}

	
	return (
		<div>
			<Formik
			enableReinitialize={true}
			initialValues={
				editing && data ?
					{
						first_name: data.first_name,
						last_name: data.last_name,
						birth_date: data.birth_date.slice(0, 10),
						nationality: data.nationality
					}
					:
					{
						first_name: '',
						last_name: '',
						birth_date: '',
						nationality: ''
					}
			}
			validate={handleValidate}
			onSubmit={editing ? handleSubmitEdit : handleSubmitAdd}>
			{ (formProps) => (
				<div className="row justify-content-md-center">
					<div className='container-add col'>
						{bookError && <div> Nie udało się załadować danych</div>}
						{loading && <div>Ładowanie...</div>}
						<div className='button-back'>
							<button className='btn btn-primary' type='button' onClick={handleClick}><RiArrowGoBackLine /></button>
						</div>
						<div className='form'>
							<form className='add-person'>
								{editing ? <h2>Edytuj osobę</h2> : <h2>Dodaj osobę</h2>}
								<div className='mb-2'>
									<label className='form-label'>Imię</label>
									<Field type='text' className='form-control' name='first_name' value={formProps.values.first_name ? formProps.values.first_name : ''}>
									</Field>
									{formProps.touched.first_name && formProps.errors.first_name ? <div className="error">{formProps.errors.first_name}</div> : null}
								</div>
								<div className='mb-2'>
									<label className='form-label'>Nazwisko</label>
									<Field type='text' className='form-control' name='last_name' value={formProps.values.last_name ? formProps.values.last_name : ''}>
									</Field>
									{formProps.touched.last_name && formProps.errors.last_name ? <div className="error">{formProps.errors.last_name}</div> : null}
								</div>
								<div className='mb-2'>
									<label className='form-label'>Data urodzenia</label>
									<Field type='date' className='form-control' name='birth_date' value={formProps.values.birth_date ? formProps.values.birth_date : ''}>
									</Field>
									{formProps.touched.birth_date && formProps.errors.birth_date ? <div className="error">{formProps.errors.birth_date}</div> : null}
								</div>
								<div className='mb-2'>
									<label className='form-label'>Narodowość</label>
									<Field type='text' className='form-control' name='nationality' value={formProps.values.nationality ? formProps.values.nationality : ''}>
									</Field>
									{formProps.touched.nationality && formProps.errors.nationality ? <div className="error">{formProps.errors.nationality}</div> : null}
								</div>
								<div>
									{adding && !pending && !error && <button type='button' onClick={formProps.handleSubmit} className='btn' >Dodaj</button>}
									{editing && !pending && !error && <button type='button' onClick={formProps.handleSubmit} className='btn' >Zatwierdź</button>}
									{adding && pending && !error && <button className='btn' disabled>Dodawanie...</button>}
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
    createPerson
});

export default connect(null, mapDispatchToProps)(PersonsForm);