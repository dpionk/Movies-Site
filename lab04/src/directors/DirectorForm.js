import { Field, Form, Formik } from "formik"
import { v4 as uuidv4 } from 'uuid';
import { addDirectorAction, editDirectorAction } from "../actions/DirectorsActions";
import { connect, useSelector } from 'react-redux';
import { useHistory, useParams} from "react-router";
const yup = require('yup');

const DirectorForm = ({addDirectorAction, editDirectorAction}) => {

	const history = useHistory();
	const id = useParams().id

	const director = useSelector((state) => {
		return state.directors.find(element => 
			element.id === id )
	})

	console.log(director)

	const handleAdd = (values) => {
		addDirectorAction(values);
		history.push(`/directors`);
	}

	const handleEdit = (values) => {
		editDirectorAction(values);
		history.push(`/directors`);
	}
	

	const state = 
		{
			id: director ? director.id : uuidv4(),
			firstName: director ? director.firstName : '',
			lastName: director ? director.lastName : '',
			age: director ? director.age :  ''
		}
	
		const yupObject = yup.object().shape({
			firstName: yup.string()
			.required("Imię jest obowiązkowe"),
			lastName: yup.string()
			.required("Nazwisko jest obowiązkowe"),
			age: yup.number()
			.required("Wiek jest obowiązkowy")
			.min(0, ":)"),
			image: yup.string().url("Nieprawidłowy URL").notRequired()
		})
	return (

		<div>
				<div>
					{ !director ? <h3>Dodaj reżysera</h3> : <h3>Edytuj reżysera</h3>}
					<Formik
						initialValues={
							state
							}
						onSubmit={ !director ? (values) => handleAdd(values) : (values) => handleEdit(values)}
						enableReinitialize={true}
						validationSchema={yupObject}>
							
							
						{ (formProps) => (
								<Form>
									<div>
									<label>Imię</label>
							<Field  type="text" name="firstName" />	
							{formProps.touched.firstName && formProps.errors.firstName ? <div className="error">{formProps.errors.firstName}</div> : null}													
                            </div>
							<div>
									<label>Nazwisko</label>
							<Field  type="text" name="lastName" />	
							{formProps.touched.lastName && formProps.errors.lastName ? <div className="error">{formProps.errors.lastName}</div> : null}													
                            </div>
							<div>
							<label>Wiek</label>
							<Field name="age" />
							{formProps.touched.age && formProps.errors.age ? <div className="error">{formProps.errors.age}</div> : null}
							</div>
							{ !director ? 
							<button type="submit">
								Dodaj
							</button>
							:
							<button type="submit">
								Zatwierdź edycję
							</button>
							}
						</Form>
							)}
					</Formik>
				</div>
		</div>
	)
}


const mapDispatchToProps = {
	addDirectorAction,
	editDirectorAction
};

export default connect(null, mapDispatchToProps)(DirectorForm);