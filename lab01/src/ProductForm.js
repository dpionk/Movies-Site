import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Formik, Field } from "formik";
import axios from 'axios';
function ProductForm({ pobierz, products }) {

	const history = useHistory();

	const [pending, setPending] = useState(false);
	const [error, setError] = useState(false);
	const [editing, setEditing] = useState(false);
	const [adding, setAdding] = useState(false)
	const [loading, setLoading] = useState(false);
	const [bookError, setBookError] = useState(false);
	const [data, setData] = useState();

	const id = useParams();

	const handleSubmitEdit = (values) => {
		setPending(true);
		axios.put(`http://localhost:5000/api/book/${id.id}`, values).then(() => {
			setPending(false);
			pobierz();
			alert("Edycja przebiegła pomyślnie");
			history.go(-1);
		}).catch(() => {
			setPending(false);
			setError(true);
		})
	}

	const handleSubmitAdd = (values) => {
		setPending(true);
		axios.post('https://fakestoreapi.com/products', values).then((response) => {
			console.log(response)
			setPending(false);
			pobierz();
			alert("Dodano!");
			if (response.status === 200) {

			}
			history.push('/');
		})

	}

	const handleValidate = (values) => {
		const errors = {};

		if (!values.title) {
			errors.title = "Tytuł nie może być pusty"
		}
		if (!values.price) {
			errors.price = "Cena nie może być pusta"
		}
		if (!values.description) {
			errors.description = "Opis nie może być pusty"
		}
		if (!values.category) {
			errors.release_date = "Obrazek wymagany"
		}
		if (!values.image) {
			errors.description = "Opis nie może być pusty"
		} 
		return errors;
	}

	useEffect(() => {
		if (id.id !== undefined) {
			setAdding(false);
			setEditing(true);
			axios.get(`http://localhost:5000/api/book/${id.id}`).then((response) => {
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

	return (
		<Formik
			enableReinitialize
			initialValues={
				editing && data ?
					{
						title: data.title,
						price: data.price,
						description: data.description,
						category: data.category,
						image: data.image,
					}
					:
					{
						title: '',
						price: '',
						description: '',
						category: '',
						image: ''
					}
			}
			validate={handleValidate}
			onSubmit={editing ? handleSubmitEdit : handleSubmitAdd}>

			{ (formProps) => (
				<div >
					<div>
						{bookError && <div> Nie udało się załadować danych książki</div>}
						{loading && <div>Ładowanie...</div>}
						<div>
							<form>
								{editing ? <h2>Edytuj produkt</h2> : <h2>Dodaj produkt</h2>}
								<div>
									<label>Tytuł</label>
									<Field type='text' name='title' value={formProps.values.title ? formProps.values.title : ''}>
									</Field>
									{formProps.touched.title && formProps.errors.title ? <div className="error">{formProps.errors.title}</div> : null}
								</div>
								<div className='mb-2'>
									<label className='form-label'>Cena</label>
									<Field type='text' name='price' value={formProps.values.price ? formProps.values.price : ''}>
									</Field>
									{formProps.touched.price && formProps.errors.price ? <div className="error">{formProps.errors.price}</div> : null}
								</div>
								<div className='mb-2'>
									<label className='form-label'>Kategoria</label>
									<Field type='text' name='category' value={formProps.values.category ? formProps.values.category : ''}>
									</Field>
									{formProps.touched.category && formProps.errors.category ? <div className="error">{formProps.errors.category}</div> : null}
								</div>
								<div className='mb-2'>
									<label className='form-label'>Opis</label>
									<Field component='textarea' name='description' value={formProps.values.description ? formProps.values.description : ''}>
									</Field>
									{formProps.touched.description && formProps.errors.description ? <div className="error">{formProps.errors.description}</div> : null}
								</div>
								<div className='mb-2'>
									<label className='form-label'>Link do obrazka</label>
									<Field type='text' name='image' value={formProps.values.image ? formProps.values.image : ''}>
									</Field>
									{formProps.touched.image && formProps.errors.image ? <div className="error">{formProps.errors.image}</div> : null}
								</div>
								<div>
									{adding && !pending && !error && <button type='button' onClick={formProps.handleSubmit}  >Dodaj</button>}
									{editing && !pending && !error && <button type='button' onClick={formProps.handleSubmit}>Zatwierdź</button>}
									{adding && pending && !error && <button  disabled>Dodawanie...</button>}
									{editing && pending && !error && <button disabled>Zmieniam  dane..</button>}
									{error && <button className='btn' disabled>Coś poszło nie tak....</button>}
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</Formik>
	);
}

export default ProductForm;

