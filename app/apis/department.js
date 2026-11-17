import axios from 'axios'

const departmentsUrl = '/departments'

const fetchDepartments = () => axios.get(departmentsUrl)

const departmentApi = {
  fetchDepartments,
}

export default departmentApi
