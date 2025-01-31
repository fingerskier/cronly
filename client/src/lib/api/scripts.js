import { get, post, put, del } from '../network.js'

/**
 * Read all scripts
 * @returns {Promise<Array>} The array of scripts
 */
export const read = async () => {
  const response = await get('/api/scripts')
  const result = await response.json()
  return result
}

/**
 * Run a script
 * @param {string} script - The name of the script to run
 * @returns {Promise<string>} The result of the script
 */
export const run = async (script) => {
  const response = await put(`/api/scripts/${script}`)
  const result = await response.json()
  return result
}

/**
 * Create a script
 * @param {string} script - The name of the script to create
 * @returns {Promise<string>} The result of the script
 */
export const add = async (script) => {
  const response = await post('/api/scripts', { script })
  const result = await response.json()
  return result
}

export default { read, run, create: add }