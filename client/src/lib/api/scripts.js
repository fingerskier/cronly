/**
 * Read all scripts
 * @returns {Promise<Array>} The array of scripts
 */
export const read = async () => {
  const response = await fetch('/api/scripts')
  const result = await response.json()
  return result
}


export default { read }