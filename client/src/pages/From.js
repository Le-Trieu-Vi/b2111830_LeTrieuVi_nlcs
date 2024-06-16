import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

function AddTable() {
  return (
    <div className='addTableContainer'>
      <Formik 
        initialValues={{ name: '', email: '', password: ''}} 
        onSubmit={(values) => {
          console.log(values);
        }} 
        validationSchema={validationSchema}
      >
        <Form>
          <ErrorMessage name='name' component='div' />
          <Field className='border border-current block' name='name' type='text' placeholder='Name' />
          <ErrorMessage name='email' component='div' />
          <Field className='border border-current block' name='email' type='email' placeholder='Email' />
          <ErrorMessage name='password' component='div' />
          <Field className='border border-current block' name='password' type='password' placeholder='Password'/>

          <button className='bg-blue-500 text-white p-2 rounded' type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddTable