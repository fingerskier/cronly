import basicAuth from 'basic-auth'
import userService from '../services/userService.js'

export default async (req, res, next) => {
  const credentials = basicAuth(req)
  
  if (!credentials) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected"')
    return res.status(401).json({ message: 'Authentication required' })
  }
  
  try {
    const isValid = await userService.verifyUser(credentials.name, credentials.pass)
    if (isValid) {
      req.user = credentials.name
      next()
    } else {
      // Change status to 401 to trigger browser auth prompt
      res.setHeader('WWW-Authenticate', 'Basic realm="Protected"')
      res.status(401).json({ 
        message: 'Invalid credentials'
      })
    }
  } catch (error) {
    // Change status to 401 to trigger browser auth prompt
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected"')
    res.status(401).json({ 
      message: 'Authentication error'
    })
  }
}