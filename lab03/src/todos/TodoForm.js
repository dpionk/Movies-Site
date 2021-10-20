import { Field, Form, Formik } from "formik"
import {v4 as uuidv4 } from 'uuid';
import { addTodoAction } from "../actions/TodoActions";
import { useEffect } from "react";
import { connect } from 'react-redux';

const TodoForm = (props) => {

    useEffect(() => {
        console.log(props.todos);
    }, [props])

    const handleSubmit = (values) => {
        props.addTodoAction(values);
    }

    return (
        <div>
        <h3>Add todo</h3>
        <Formik
            initialValues={{
                id: uuidv4(),
                name: '',
                date: '',
                done: false
            }}
            onSubmit={(values) => handleSubmit(values)}
            enableReinitialize={true}>
                <Form>
                    <Field name="name" />
                    <Field name="date" />
                    <button type="submit">
                        Submit
                    </button>
                </Form>
            </Formik>
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
};

const mapDispatchToProps = {
    addTodoAction
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);