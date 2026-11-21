import { useMutation } from '@tanstack/react-query'

import employeeImportApi from 'apis/employeeImport'

const buildFormData = (file) => {
  const formData = new FormData()
  formData.append('file', file)

  return formData
}

const useImportEmployees = (options = {}) =>
  useMutation({
    mutationFn: (file) => employeeImportApi.importEmployees(buildFormData(file)),
    ...options,
  })

export default useImportEmployees
