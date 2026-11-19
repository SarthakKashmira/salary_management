import axios from 'axios'

const departmentsUrl = '/departments'

const fetchDepartments = (params) => axios.get(departmentsUrl, { params })

const fetchDepartment = (id) => axios.get(`${departmentsUrl}/${id}`)

const createDepartment = (payload) => axios.post(departmentsUrl, payload)

const updateDepartment = ({ id, payload }) => axios.put(`${departmentsUrl}/${id}`, payload)

const bulkDeleteDepartments = (ids) => axios.delete(`${departmentsUrl}/bulk_destroy`, { data: { ids } })

const departmentApi = {
  fetchDepartments,
  fetchDepartment,
  createDepartment,
  updateDepartment,
  bulkDeleteDepartments,
}

export default departmentApi
