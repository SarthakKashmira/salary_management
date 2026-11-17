import axios from 'axios'

const employeesUrl = '/employees'

const fetchEmployees = (params) => axios.get(employeesUrl, { params })

const createEmployee = (payload) => axios.post(employeesUrl, payload)

const employeeApi = {
  fetchEmployees,
  createEmployee,
}

export default employeeApi
