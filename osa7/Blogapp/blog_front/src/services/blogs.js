import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log('blogs.js')
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}



const update = async ( newObject) => {
  console.log(newObject.id)
  const config = {
    headers: { Authorization: token },
  }
  const address = baseUrl.concat('/').concat(newObject.id.trim())

  const response = await axios.put(address, newObject, config)
  return response.data
}



const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const address = baseUrl.concat('/').concat(id)

  const response = await axios.delete(address, config)
  return response.data
}

const comment = async (blogid, comment) => {

  const address = baseUrl.concat('/').concat(blogid).concat('/comments')
  console.log(address)
  const response = await axios.post(address, comment)
  return response.data
}

export default { getAll, create, update, setToken, remove, comment }