import axios from 'axios'

const currenciesUrl = '/currencies'

const fetchCurrencies = () => axios.get(currenciesUrl)

const currencyApi = {
  fetchCurrencies,
}

export default currencyApi
