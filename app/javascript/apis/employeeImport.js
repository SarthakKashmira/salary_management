import axios from 'axios'

const importEmployees = (formData) =>
  axios.post('/employee_imports', formData, { headers: { 'Content-Type': undefined } })

const employeeImportApi = {
  importEmployees,
}

export default employeeImportApi
