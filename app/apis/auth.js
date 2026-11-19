import axios from 'axios'

const login = (payload) => axios.post('/session', payload)

const register = (payload) => axios.post('/registration', payload)

const authApi = {
  login,
  register,
}

export default authApi
