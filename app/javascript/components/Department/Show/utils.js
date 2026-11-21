export const buildInitialValuesFromDepartment = (department) => ({
  name: department.name,
  code: department.code ?? '',
  description: department.description ?? '',
})
