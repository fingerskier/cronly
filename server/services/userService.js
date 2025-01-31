import fs from 'fs/promises'
import path from 'path'

const __dirname = (new URL(import.meta.url)).pathname.substring(1)

const USERS_FILE = path.join(__dirname, '../../../config/users.json')

console.log('USERS FILE')
console.log(USERS_FILE)

export const createUser = async (username, password) => {
  try {
    const users = await getAllUsers()
    
    if (users[username]) {
      throw new Error('User already exists')
    }
    
    users[username] = password
    
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
    return { username }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const deleteUser = async (username) => {
  const users = await getAllUsers()
  delete users[username]
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
}

export const getAllUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8')
    
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users file:', error)
    return {}
  }
}

export const getUser = async (username) => {
  const users = await getAllUsers()
  const thisUser = {
    username,
    password: users[username]
  }
  return thisUser

}


export const verifyUser = async (username, password) => {
  try {
    const users = await getAllUsers()
    
    if (!users[username]) {
      return false
    }
    
    return password === users[username]
  } catch (error) {
    console.error('Error verifying user:', error)
    return false
  }
}

export const updateUser = async (username, password) => {
  try {
    const users = await getAllUsers()
    users[username] = password
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// You can also keep the default export if needed
export default {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  verifyUser,
  updateUser
}