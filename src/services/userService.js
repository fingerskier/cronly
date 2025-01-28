import fs from 'fs/promises'
import bcrypt from 'bcryptjs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const USERS_FILE = path.join(__dirname, '../../config/users.json')

const userService = {
  async getAllUsers() {
    const data = await fs.readFile(USERS_FILE, 'utf8')
    return JSON.parse(data)
  },

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

  async verifyUser(username, password) {
    const users = await this.getAllUsers()
    if (!users[username]) {
      return false
    }
    return bcrypt.compare(password, users[username])
  }
}


export default userService