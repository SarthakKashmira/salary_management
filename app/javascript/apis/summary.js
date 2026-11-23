import axios from 'axios'

const summaryUrl = '/summary'

const fetchSummary = (params) => axios.get(summaryUrl, { params })

const summaryApi = {
  fetchSummary,
}

export default summaryApi
