import axios from 'axios'

const employeesUrl = '/employees'

const fetchEmployees = (params) => axios.get(employeesUrl, { params })

const fetchEmployee = (id) => axios.get(`${employeesUrl}/${id}`)

const createEmployee = (payload) => axios.post(employeesUrl, payload)

const bulkDeleteEmployees = (ids) => axios.delete(`${employeesUrl}/bulk_destroy`, { data: { ids } })

const employeeApi = {
  fetchEmployees,
  fetchEmployee,
  createEmployee,
  bulkDeleteEmployees,
}

export default employeeApi
