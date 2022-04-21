import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Formik, Field } from "formik";
import { RiArrowGoBackLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { getPersonDetails, getPersonsLoading } from '../../../ducks/Persons/selectors';
import { createPerson, editPerson } from '../../../ducks/Persons/operations';
import './PersonsForm.scss'

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

function PersonsForm({ createPerson, editPerson, person, loading, pending }) {


	const nationalityArray = [ 'Afghan',
	'Albanian',
	'Algerian',
	'American',
	'Andorran',
	'Angolan',
	'Antiguans',
	'Argentinean',
	'Armenian',
	'Australian',
	'Austrian',
	'Azerbaijani',
	'Bahamian',
	'Bahraini',
	'Bangladeshi',
	'Barbadian',
	'Barbudans',
	'Batswana',
	'Belarusian',
	'Belgian',
	'Belizean',
	'Beninese',
	'Bhutanese',
	'Bolivian',
	'Bosnian',
	'Brazilian',
	'British',
	'Bruneian',
	'Bulgarian',
	'Burkinabe',
	'Burmese',
	'Burundian',
	'Cambodian',
	'Cameroonian',
	'Canadian',
	'Cape Verdean',
	'Central African',
	'Chadian',
	'Chilean',
	'Chinese',
	'Colombian',
	'Comoran',
	'Congolese',
	'Costa Rican',
	'Croatian',
	'Cuban',
	'Cypriot',
	'Czech',
	'Danish',
	'Djibouti',
	'Dominican',
	'Dutch',
	'East Timorese',
	'Ecuadorean',
	'Egyptian',
	'Emirian',
	'Equatorial Guinean',
	'Eritrean',
	'Estonian',
	'Ethiopian',
	'Fijian',
	'Filipino',
	'Finnish',
	'French',
	'Gabonese',
	'Gambian',
	'Georgian',
	'German',
	'Ghanaian',
	'Greek',
	'Grenadian',
	'Guatemalan',
	'Guinea-Bissauan',
	'Guinean',
	'Guyanese',
	'Haitian',
	'Herzegovinian',
	'Honduran',
	'Hungarian',
	'I-Kiribati',
	'Icelander',
	'Indian',
	'Indonesian',
	'Iranian',
	'Iraqi',
	'Irish',
	'Israeli',
	'Italian',
	'Ivorian',
	'Jamaican',
	'Japanese',
	'Jordanian',
	'Kazakhstani',
	'Kenyan',
	'Kittian and Nevisian',
	'Kuwaiti',
	'Kyrgyz',
	'Laotian',
	'Latvian',
	'Lebanese',
	'Liberian',
	'Libyan',
	'Liechtensteiner',
	'Lithuanian',
	'Luxembourger',
	'Macedonian',
	'Malagasy',
	'Malawian',
	'Malaysian',
	'Maldivan',
	'Malian',
	'Maltese',
	'Marshallese',
	'Mauritanian',
	'Mauritian',
	'Mexican',
	'Micronesian',
	'Moldovan',
	'Monacan',
	'Mongolian',
	'Moroccan',
	'Mosotho',
	'Motswana',
	'Mozambican',
	'Namibian',
	'Nauruan',
	'Nepalese',
	'New Zealander',
	'Nicaraguan',
	'Nigerian',
	'Nigerien',
	'North Korean',
	'Northern Irish',
	'Norwegian',
	'Omani',
	'Pakistani',
	'Palauan',
	'Panamanian',
	'Papua New Guinean',
	'Paraguayan',
	'Peruvian',
	'Polish',
	'Portuguese',
	'Qatari',
	'Romanian',
	'Russian',
	'Rwandan',
	'Saint Lucian',
	'Salvadoran',
	'Samoan',
	'San Marinese',
	'Sao Tomean',
	'Saudi',
	'Scottish',
	'Senegalese',
	'Serbian',
	'Seychellois',
	'Sierra Leonean',
	'Singaporean',
	'Slovakian',
	'Slovenian',
	'Solomon Islander',
	'Somali',
	'South African',
	'South Korean',
	'Spanish',
	'Sri Lankan',
	'Sudanese',
	'Surinamer',
	'Swazi',
	'Swedish',
	'Swiss',
	'Syrian',
	'Taiwanese',
	'Tajik',
	'Tanzanian',
	'Thai',
	'Togolese',
	'Tongan',
	'Trinidadian/Tobagonian',
	'Tunisian',
	'Turkish',
	'Tuvaluan',
	'Ugandan',
	'Ukrainian',
	'Uruguayan',
	'Uzbekistani',
	'Venezuelan',
	'Vietnamese',
	'Welsh',
	'Yemenite',
	'Zambian',
	'Zimbabwean'].map((nationality) => {
		return (
			<option key={nationality} value={nationality}>{nationality}</option>
	)
	})
	const [editing, setEditing] = useState(false);
	const [adding, setAdding] = useState(false)

	const history = useNavigate();
	function handleClick() {
		history(-1);
	}

	const handleValidate = (values) => {
		const errors = {};

		if (!values.first_name) {
			errors.first_name = "Imię nie może być puste"
		}
		if (!values.last_name) {
			errors.last_name = "Nazwisko nie może być puste"
		}
		if (!values.birth_date) {
			errors.birth_date = "Data jest wymagana"
		} else if (Date.parse(values.birth_date) > Date.now()) {
			errors.birth_date = "Data nie może być późniejsza"
		}
		return errors;
	}

	useEffect(() => {
		if (person !== undefined) {
			setAdding(false);
			setEditing(true);
		}
		else {
			setEditing(false);
			setAdding(true);
		}
	}, [person])



	const handleSubmitEdit = (values) => {
		editPerson(values, history)
	}

	const handleSubmitAdd = (values) => {
		createPerson(values, history)
	}


	return (
		<div>
			<Formik
				enableReinitialize={true}
				initialValues={
					editing && person ?
						{
							id: person.id,
							first_name: person.first_name,
							last_name: person.last_name,
							birth_date: person.birth_date.slice(0, 10),
							nationality: person.nationality
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
				{(formProps) => (
					<div className="row justify-content-md-center">
						<div className='container-add col'>
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
										<Field as='select' name='nationality' className="form-select" aria-label="select" value={formProps.values.nationality ? formProps.values.nationality : ''}>
										{ editing ? <option value>{ `${person.nationality}`}</option> : <option value></option> }
										{nationalityArray}
										</Field>
									</div>
									<div>
										{adding && !pending && <button type='button' onClick={formProps.handleSubmit} className='btn' >Dodaj</button>}
										{editing && !pending && <button type='button' onClick={formProps.handleSubmit} className='btn' >Zatwierdź</button>}
										{adding && pending && <button className='btn' disabled>Dodawanie...</button>}
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
	return {
		person: getPersonDetails(state, props.router.params.id),
		pending: getPersonsLoading(state)
	}
}
const mapDispatchToProps = dispatch => ({
	createPerson: createPerson(dispatch),
	editPerson: editPerson(dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PersonsForm));