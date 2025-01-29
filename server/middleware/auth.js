import basicAuth from 'basic-auth'
import userService from '../services/userService.js'


export default async (req, res, next) => {
  const credentials = basicAuth(req)
  
  console.log('Auth headers:', req.headers.authorization)
  
  if (!credentials) {
    console.error('No credentials provided')
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected"')
    return res.status(401).json({ message: 'Authentication required' })
  }
  
  try {
    const isValid = await userService.verifyUser(credentials.name, credentials.pass)
    
    if (isValid) {
      req.user = credentials.name
      res.removeHeader('WWW-Authenticate')
      return next()
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="Protected"')
      return res.status(401).json({ 
        message: 'Invalid credentials'
      })
    }
  } catch (error) {
    console.error('Authentication error:', error)
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected"')
    return res.status(401).json({ 
      message: 'Authentication error'
    })
  }
}