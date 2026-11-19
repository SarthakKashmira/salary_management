import axios from 'axios'

const usersUrl = '/users'

const fetchUsers = (params) => axios.get(usersUrl, { params })

const fetchUser = (id) => axios.get(`${usersUrl}/${id}`)

const createUser = (payload) => axios.post(usersUrl, payload)

const updateUser = ({ id, payload }) => axios.put(`${usersUrl}/${id}`, payload)

const deleteUser = (id) => axios.delete(`${usersUrl}/${id}`)

const userApi = {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
}

export default userApi
