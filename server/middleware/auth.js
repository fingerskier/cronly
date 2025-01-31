import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key' // Should be in env vars

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}


export const generateToken = (username) => {
  return jwt.sign({ username }, JWT_SECRET, { 
    expiresIn: '24h'
  })
}


export default async (req, res, next) => {
  const authHeader = req.headers.authorization
  
  console.log('Auth headers:', authHeader)
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('No token provided')
    return res.status(401).json({ message: 'Authentication required' })
  }
  
  try {
    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return res.status(401).json({
        message: 'Invalid or expired token'
      })
    }
    
    req.user = decoded.username
    return next()
    
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(401).json({
      message: 'Authentication error' 
    })
  }
}