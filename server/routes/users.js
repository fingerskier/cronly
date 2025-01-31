import express from 'express'
import userService from '../services/userService.js'

const router = express.Router()

/**
 * Get all users
 */
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * Create new user
 */
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }
    
    const user = await userService.createUser(username, password)
    res.status(201).json(user)
  } catch (error) {
    if (error.message === 'User already exists') {
      res.status(409).json({ message: error.message }) 
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})

/**
 * Delete a user
 */
router.delete('/:username', async (req, res) => {
  try {
    const username = req.params.username
    await userService.deleteUser(username)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

/**
 * Update a user
 */
router.put('/:username', async (req, res) => {
  try {
    const username = req.params.username
    const { password } = req.body
    
    await userService.updateUser(username, password)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


export default router