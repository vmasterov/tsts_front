import axios from 'axios'

export default axios.create({
  baseURL: 'https://localhost:3444'
  // withCredentials: true
})
