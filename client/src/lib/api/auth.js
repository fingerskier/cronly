import {post} from 'lib/network'


export const login = async (username, password) => {
  try {
    const data = await post('/api/auth/login', {username, password})
    if (data.token) {
      localStorage.setItem('jwt', data.token)
    }
  } catch (error) {
    console.error('LOGIN ERROR', error)
    throw error
  }
}


export const logout = async () => {
  try {
    await post('/api/auth/logout')
  } catch (error) {
    console.error('LOGOUT ERROR', error)
    throw error
  }
}


export default {
  login,
  logout,
}