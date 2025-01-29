/**
 * Read all CRON jobs
 * @returns {Promise<Array>} The array of jobs
 */
export const read = async () => {
  const response = await fetch('/api/cron')
  const result = await response.json()
  return result
}

/**
 * Create a new CRON job
 * @param {Object} job - The job object to create
 * @returns {Promise<Object>} The created job object
 */
export const create = async (job) => {
  const response = await fetch('/api/cron', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  })
  const result = await response.json()
  return result
}

/**
 * Delete a CRON job
 * @param {Object} job - The job object to delete
 * @returns {Promise<Object>} The deleted job object
 */
export const del = async (job) => {
  const response = await fetch(`/api/cron/${job.name}`, {
    method: 'DELETE'
  })
  const result = await response.json()
  return result
}

export default { read, create, del }
