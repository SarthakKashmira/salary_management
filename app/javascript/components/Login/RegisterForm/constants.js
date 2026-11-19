import * as Yup from 'yup'

export const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
}

export const VALIDATION_SCHEMA = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string().trim().email('Enter a valid email address').required('Email is required'),
  phone: Yup.string().trim(),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})
