import axios from 'axios';
import UserService from './services/user';

const baseURL = process.env.VUE_APP_API_URL
const appId = process.env.VUE_APP_ID
const httpClient = axios.create(
  {
    baseURL,
    headers: {
      'app-id': appId
    }
  })

httpClient.interceptors.response.use(response => {
  return response
}, async error => {
  return Promise.reject(error)
})

export default {
  user: UserService(httpClient),
}