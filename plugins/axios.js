import https from 'https'
import axios from 'axios'

const agent = new https.Agent({
  rejectUnauthorized: false
})

export default axios.create({
  baseURL: 'https://localhost:3444',
  withCredentials: false,
  httpsAgent: agent // hack for local development
})
