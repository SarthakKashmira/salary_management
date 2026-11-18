import axios from 'axios'

const departmentsUrl = '/departments'

const fetchDepartments = (params) => axios.get(departmentsUrl, { params })

const createDepartment = (payload) => axios.post(departmentsUrl, payload)

const bulkDeleteDepartments = (ids) => axios.delete(`${departmentsUrl}/bulk_destroy`, { data: { ids } })

const departmentApi = {
  fetchDepartments,
  createDepartment,
  bulkDeleteDepartments,
}

export default departmentApi
