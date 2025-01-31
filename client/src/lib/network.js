/**
 * Get headers with auth from localStorage
 */
const getHeaders = () => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })
  
  const token = localStorage.getItem('jwt')
  if (token) {
    headers.append('Authorization', `Bearer ${token}`)
  }
  
  return headers
}

/**
 * Check response and clear credentials if unauthorized
 */
const handleUnauthorized = (response) => {
  if (response.status === 401) {
    const credentials = localStorage.getItem('credentials')
    const token = localStorage.getItem('jwt')
    
    if (credentials) {
      localStorage.removeItem('credentials')
    }
    if (token) {
      localStorage.removeItem('jwt')
    }
    window.location.reload()
  }
  return response
}

/**
 * GET request wrapper
 */
export const get = async (url, data) => {
  try {
    // build query string from `data`
    const queryString = data? Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&') : ''
    
    const response = await fetch(url + (queryString ? `?${queryString}` : ''), {
      credentials: 'include',
      headers: getHeaders(),
      method: 'GET',
    })
    
    const result = await handleUnauthorized(response).json()
    
    return result
  } catch (error) {
    console.error('GET', url, error)
    throw error
  }
}

/**
 * POST request wrapper
 */
export const post = async (url, data) => {
  try {
    const response = await fetch(url, {
      body: JSON.stringify(data),
      credentials: 'include',
      headers: getHeaders(),
      method: 'POST',
    })
    const result = await response.json()
    
    return result
  } catch (error) {
    console.error('POST', url, error)
    throw error
  }
}

/**
 * PUT request wrapper
 */
export const put = async (url, data) => {
  try {
    const response = await fetch(url, {
      body: JSON.stringify(data),
      credentials: 'include',
      headers: getHeaders(),
      method: 'PUT',
    })
    
    const result = response.headers.get('content-type')?.includes('json')
      ? await response.json()
      : await response.text()
    
    return result
  } catch (error) {
    console.error('PUT', url, error)
    throw error
  }
}

/**
 * DELETE request wrapper
 */
export const del = async (url) => {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: getHeaders(),
      method: 'DELETE',
    })
    

    const result = response.headers.get('content-type')?.includes('json')
      ? await response.json()
      : await response.text()
    
    return result
  } catch (error) {
    console.error('DELETE', url, error)
    throw error
  }
}