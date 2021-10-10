import React from 'react';
import { Formik, Field } from 'formik';

function productForm() {
    const axios = require('axios')

    const handleSubmit = (values) => {
        axios.post('https://fakestoreapi.com/products', values).then (() => {
            alert("git")
        }).catch(() => {
            alert('źle')
        })
    }
    return (
        <div>
            <div>
                DODAJ
            </div>
            <Formik 
            initialValues = {{
                category: '', description: '', image:'', price:0
            }}
            
            onSubmit= {handleSubmit}
            >
            
            {
                (formProps) => {
                    <form>
                        <div>
                        <label className='form-label'>Kategoria</label>
									<Field type='text' name='category'>
									</Field>
                         </div>
                         
                    </form>
                }
            }

                
            </Formik>
        </div>

    )

}

export default productForm;