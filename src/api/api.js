import axios from 'axios'

const axiosParams = {
  baseURL: ''
}

const axiosInstance = axios.create(axiosParams)

const successHandler = (response) => {
  return Promise.resolve(response)
}

const errorHandler = (error) => {
  return Promise.reject(error)
}

axiosInstance.interceptors.response.use(successHandler, errorHandler)

const api = (axios) => {
  const urlComplete = ''
  return {
    request: (config) => axios.request(config),
    get: (url, config) => axios.get(`${urlComplete}${url}`, config),
    delete: (url, config) => axios.delete(`${urlComplete}${url}`, config),
    head: (url, config) => axios.head(`${urlComplete}${url}`, config),
    options: (url, config) => axios.options(`${urlComplete}${url}`, config),
    post: (url, body, config) => axios.post(`${urlComplete}${url}`, body, config),
    put: (url, body, config) => axios.put(`${urlComplete}${url}`, body, config),
    patch: (url, body, config) => axios.patch(`${urlComplete}${url}`, body, config)
  }
}
export default api(axiosInstance)
