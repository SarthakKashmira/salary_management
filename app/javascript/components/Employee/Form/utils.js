import dayjs from 'dayjs'

import { camelToSnakeCase } from 'utils/string'

const snakeCaseKeys = (object) =>
  Object.fromEntries(Object.entries(object).map(([key, value]) => [camelToSnakeCase(key), value]))

export const buildSelectOptions = (records, buildLabel = (record) => record.name) =>
  records.map((record) => ({ label: buildLabel(record), value: record.id }))

// effective_from isn't a form field - it's set to today on every create, and
// per the schema is only meant to move again when amount changes on an edit.
export const buildEmployeePayload = (values) => ({
  employee: snakeCaseKeys({
    employeeId: values.employeeId,
    firstName: values.firstName,
    lastName: values.lastName || null,
    email: values.email,
    phone: values.phone || null,
    departmentId: values.departmentId || null,
    designation: values.jobTitle || null,
    countryId: values.countryId,
    joiningDate: dayjs(values.joiningDate).format('YYYY-MM-DD'),
    status: values.isActive ? 'active' : 'inactive',
  }),
  salary: snakeCaseKeys({
    amount: values.amount,
    currencyId: values.currencyId,
    effectiveFrom: dayjs().format('YYYY-MM-DD'),
  }),
})

export const getFieldStatus = (formik, name) => ({
  validateStatus: formik.touched[name] && formik.errors[name] ? 'error' : '',
  help: formik.touched[name] && formik.errors[name],
})
