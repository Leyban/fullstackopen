import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async newObj => {
  const config = {
    headers : { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const update = async updatedObj => {
  const config = {
    headers : { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${updatedObj.id}`, updatedObj, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers : { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export const blogService = { getAll, create, getToken, update, remove }