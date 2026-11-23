import axios from 'axios'

const countriesUrl = '/countries'

const fetchCountries = () => axios.get(countriesUrl)

const countryApi = {
  fetchCountries,
}

export default countryApi
