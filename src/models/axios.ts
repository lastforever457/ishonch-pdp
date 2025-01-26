import axios from 'axios'

const baseURL = 'https://ishonch.koyeb.app'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
