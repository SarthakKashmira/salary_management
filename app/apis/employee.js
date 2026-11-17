import axios from 'axios'

// axios.defaults.baseURL is "/api", so these are relative to it.
const employeesUrl = '/employees'

const fetchEmployees = (params) => axios.get(employeesUrl, { params })

const employeeApi = {
  fetchEmployees,
}

export default employeeApi
