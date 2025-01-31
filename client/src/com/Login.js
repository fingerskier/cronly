import {useState} from 'react'
import useLocalStorage from 'hook/useLocalStorage'
import API from 'lib/api'


export default function Login() {
  const [credentials, setCredentials] = useLocalStorage('credentials', null)
  
  const [username, setUsername] = useState(credentials?.username || '')
  const [password, setPassword] = useState(credentials?.password || '')
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (username && password) {
      const token = await API.auth.login(username, password)
      setCredentials({username, password, token})
    } else {
      setCredentials(null)
    }
    
    return false
  }
  
  
  return <>
    <h1>Account</h1>
    
    {credentials? <>
      <button onClick={() => setCredentials(null)}>Logout</button>
    </> :
      <form onSubmit={handleSubmit}>

        <input type="text" 
          autoFocus
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)} 
        />
        
        <input type="password" 
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
        
        <button type="submit">Login</button>
      </form>
    }
  </>

}