import { get, post, put, del } from '../network.js'

/**
 * Add a new user
 * @param {string} username - The username to add
 * @param {string} password - The password for the user
 * @returns {Promise<Object>} The added user object
 */
export const create = async (username, password) => {
  const result = await post('/api/users', { username, password })
  return result
}

/**
 * Read all users
 * @returns {Promise<Array>} The array of users
 */
export const read = async () => {
  try {
    const result = await get('/api/users')
    return result
  } catch (error) {
    console.error('USER:READ', error)
    throw error
  }
}

/**
 * Update a user
 * @param {string} username - The username to update
 * @param {string} password - The new password for the user
 * @returns {Promise<Object>} The updated user object
 */
export const update = async (username, password) => {
  try {
    const result = await put(`/api/users/${username}`, { password })
    return result
  } catch (error) {
    console.error('USER:UPDATE', error)
    throw error
  }
}

/**
 * Delete a user
 * @param {string} username - The username to delete
 * @returns {Promise<void>}
 */
export const remove = async (username) => {
  try {
    const result = await del(`/api/users/${username}`)
    return result
  } catch (error) {
    console.error('USER:REMOVE', error)
    throw error
  }
}


export default { 
  read, 
  create,
  update,
  remove,
}