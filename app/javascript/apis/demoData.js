import axios from 'axios'

const seedDemoData = () => axios.post('/demo_data/seed')

const clearDemoData = () => axios.post('/demo_data/clear')

const demoDataApi = {
  seedDemoData,
  clearDemoData,
}

export default demoDataApi
