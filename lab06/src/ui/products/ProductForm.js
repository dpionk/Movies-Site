import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { createProduct } from '../../ducks/products/operations';
import {v4 as uuidv4 } from 'uuid';
import { useHistory} from "react-router";

const ProductForm = ({ createProduct }, props) => {

    const handleSubmit = (values) => {
        createProduct(values);
		history.push(`/products`)
    }

	const history = useHistory();

    return (
        <div>
            <h3>Product</h3>
            <Formik
                initialValues={{
					id: uuidv4(),
                    title: '',
                }}
                onSubmit={(values) => handleSubmit(values)}
                enableReinitialize={true}>
                    <Form>
                        <Field name="title" />
                        <button type="submit">
                            Zatwierdz
                        </button>
                    </Form>
                </Formik>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {};   
}

const mapDispatchToProps = ({
    createProduct
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);