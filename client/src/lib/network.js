/**
 * Get headers with auth from localStorage
 */
const getHeaders = () => {
  const credentials = JSON.parse(localStorage.getItem('credentials') || '{}')
  
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': credentials.username && credentials.password 
      ? 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
      : ''
  })
  
  return headers
}

/**
 * GET request wrapper
 */
export const fetchGet = async (url, data) => {
  // build query string from `data`
  const queryString = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&')
  
  const response = await fetch(url + (queryString ? `?${queryString}` : ''), {
    method: 'GET',
    headers: getHeaders(),
  })
  
  return await response.json()
}

/**
 * POST request wrapper
 */
export const fetchPost = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * PUT request wrapper
 */
export const fetchPut = async (url, data) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  return await response.json()
}

/**
 * DELETE request wrapper
 */
export const fetchDelete = async (url) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return await response.json()
}
