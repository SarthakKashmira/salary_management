import dayjs from 'dayjs'
import * as Yup from 'yup'

export const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  employeeId: '',
  jobTitle: '',
  departmentId: undefined,
  countryId: undefined,
  joiningDate: dayjs(),
  isActive: true,
  currencyId: undefined,
  amount: '',
}

export const VALIDATION_SCHEMA = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim(),
  email: Yup.string().trim().email('Enter a valid email address').required('Email is required'),
  phone: Yup.string().trim(),
  employeeId: Yup.string().trim().required('Employee ID is required'),
  jobTitle: Yup.string().trim(),
  departmentId: Yup.number(),
  countryId: Yup.number().required('Country is required'),
  joiningDate: Yup.date().typeError('Enter a valid date').required('Joining date is required'),
  isActive: Yup.boolean(),
  currencyId: Yup.number().required('Currency is required'),
  amount: Yup.number().typeError('Enter a valid amount').positive('Amount must be greater than 0').required('Amount is required'),
})
