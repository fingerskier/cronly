/**
 * Read all users
 * @returns {Promise<Array>} The array of users
 */
export const read = async () => {
  const response = await fetch('/api/users')
  const result = await response.json()
  console.log('USER:READ', result)
  return result
}

/**
 * Create a new user
 * @param {Object} user - The user object to create
 * @returns {Promise<Object>} The created user object
 */
export const create = async (user) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  const result = await response.json()
  return result
}


export default { read, create }