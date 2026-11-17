import axios from 'axios'

const employeesUrl = '/employees'

const fetchEmployees = (params) => axios.get(employeesUrl, { params })

const employeeApi = {
  fetchEmployees,
}

export default employeeApi
