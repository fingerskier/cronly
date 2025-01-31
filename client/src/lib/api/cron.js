import { get, post, del } from '../network.js'


/**
 * Read all CRON jobs
 * @returns {Promise<Array>} The array of jobs
 */
export const read = async () => {
  const response = await get('/api/cron')
  const result = await response.json()
  return result
}

/**
 * Create a new CRON job
 * @param {Object} job - The job object to create
 * @returns {Promise<Object>} The created job object
 */
export const create = async (job) => {
  const response = await post('/api/cron', job)
  const result = await response.json()
  return result
}

/**
 * Delete a CRON job
 * @param {Object} job - The job object to delete
 * @returns {Promise<Object>} The deleted job object
 */
export const remove = async (job) => {
  const response = await remove(`/api/cron/${job.name}`)
  const result = await response.json()
  return result
}

export default { read, create, remove }
