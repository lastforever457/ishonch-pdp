import axios from 'axios'

const baseURL = 'http://10.10.2.123:8080'

const api = axios.create({
  baseURL,
})

export default api
