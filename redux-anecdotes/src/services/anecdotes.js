import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

/**
 * The function `getAll` makes an asynchronous HTTP GET request to a specified base URL and returns the
 * response data.
 * @returns The data from the response of the axios GET request.
 */
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

/**
 * The `create` function sends a POST request to a specified base URL with the provided content and
 * returns the response data.
 * @param content - The `content` parameter is the data that you want to send in the request body when
 * making a POST request to the `baseUrl`. It could be any valid JSON data that you want to send to the
 * server.
 * @returns The data from the response of the POST request.
 */
const create = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

/**
 * The `update` function sends a PUT request to update the content with the specified ID and returns
 * the response data.
 * @param content - The `content` parameter is an object that represents the data you want to update.
 * It should have an `id` property that specifies the identifier of the content you want to update. The
 * `axios.put` method is used to send a PUT request to the specified URL
 * @returns the data from the response object.
 */
const update = async (content) => {
  const response = await axios.put(`${baseUrl}/${content.id}`, content)
  return response.data
}

export default { getAll, create, update }
