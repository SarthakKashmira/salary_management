import axios from 'axios'

const usersUrl = '/users'

const fetchUsers = (params) => axios.get(usersUrl, { params })

const createUser = (payload) => axios.post(usersUrl, payload)

const userApi = {
  fetchUsers,
  createUser,
}

export default userApi
