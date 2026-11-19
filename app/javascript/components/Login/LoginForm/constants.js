import * as Yup from 'yup'

export const INITIAL_VALUES = {
  email: '',
  password: '',
}

export const VALIDATION_SCHEMA = Yup.object({
  email: Yup.string().trim().email('Enter a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
})
