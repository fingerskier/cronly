import {useState} from 'react'
import useLocalStorage from 'hook/useLocalStorage'


export default function Login() {
  const [credentials, setCredentials] = useLocalStorage('credentials', null)
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (username && password) {
      setCredentials(username, password)
    } else {
      setCredentials(null)
    }
    
    return false
  }
  
  
  return <>
    <h1>Login</h1>
    
    <form onSubmit={handleSubmit}>
      <input type="text" 
        autoFocus
        defaultValue={credentials?.username}
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)} 
      />

      <input type="password" 
        defaultValue={credentials?.password}
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)} 
      />

      <button type="submit">Login</button>
    </form>
  </>
}