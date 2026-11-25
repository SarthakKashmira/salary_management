import { camelToSnakeCase } from 'utils/string'

const snakeCaseKeys = (object) =>
  Object.fromEntries(Object.entries(object).map(([key, value]) => [camelToSnakeCase(key), value]))

export const buildRegistrationPayload = (values) => ({
  user: snakeCaseKeys({
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName || null,
    password: values.password,
    phone: values.phone || null,
  }),
})

export const getFieldStatus = (formik, name) => ({
  validateStatus: formik.touched[name] && formik.errors[name] ? 'error' : '',
  help: formik.touched[name] && formik.errors[name],
})
