import * as Yup from 'yup'

export const INITIAL_VALUES = {
  name: '',
  code: '',
  description: '',
}

export const VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  code: Yup.string().trim().required('Code is required'),
  description: Yup.string().trim(),
})
