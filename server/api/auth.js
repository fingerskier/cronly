import { Router } from 'express'
import { generateToken } from '../middleware/auth.js'
import {getUser} from '../services/userService.js'


const router = Router()

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username and password are required' 
      })
    }
    
    const user = await getUser(username)
    
    if (!user || !user.password) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      })
    }
    
    // Compare plain-text passwords directly
    const isValidPassword = password === user.password
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        message: 'Invalid password' 
      })
    }
    
    // Generate JWT token
    const token = generateToken(username)
    
    return res.json({ 
      token,
      username,
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ 
      message: 'Internal server error' 
    })
  }
})


export default router