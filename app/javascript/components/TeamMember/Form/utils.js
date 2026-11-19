import { camelToSnakeCase } from 'utils/string'

const snakeCaseKeys = (object) =>
  Object.fromEntries(Object.entries(object).map(([key, value]) => [camelToSnakeCase(key), value]))

export const buildUserPayload = (values) => ({
  user: snakeCaseKeys({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    role: values.role,
  }),
})

export const buildUserUpdatePayload = (values) => ({
  user: snakeCaseKeys({
    firstName: values.firstName,
    lastName: values.lastName,
    phone: values.phone,
    role: values.role,
  }),
})

export const buildInitialValuesFromUser = (user) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone ?? '',
  role: user.role,
})

export const getFieldStatus = (formik, name) => ({
  validateStatus: formik.touched[name] && formik.errors[name] ? 'error' : '',
  help: formik.touched[name] && formik.errors[name],
})
