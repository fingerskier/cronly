import fs from 'fs/promises'
import bcrypt from 'bcryptjs'
import path from 'path'

const __dirname = (new URL(import.meta.url)).pathname.substring(1)

const USERS_FILE = path.join(__dirname, '../../../config/users.json')

console.log('USERS FILE')
console.log(USERS_FILE)


const userService = {
  /**
   * Get all users
   */
  async getAllUsers() {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8')
      console.log('ALL USERS', data)
      return JSON.parse(data)
    } catch (error) {
      console.error('Error reading users file:', error)
      return {}
    }
  },
  
  /**
   * Create new user
   */
  async createUser(username, password) {
    const users = await this.getAllUsers()
    if (users[username]) {
      throw new Error('User already exists')
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    users[username] = hashedPassword
    
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
    return { username }
  },
  
  /**
   * Verify user
   */
  async verifyUser(username, password) {
    const users = await this.getAllUsers()
    
    if (!users[username]) {
      console.log('USER NOT FOUND', users, username, password)
      return false
    }
    
    console.log('VERIFIED USER', username, users[username])
    return password === users[username]
  }
}


export default userService