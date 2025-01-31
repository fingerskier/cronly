import {useEffect, useState} from 'react'
import API from 'lib/api'
import icon from 'unicode-icons'
import useLocalStorage from 'hook/useLocalStorage'


export default function Users() {
  const [credentials] = useLocalStorage('credentials', {})
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  
  
  const handleAdd = async(event) => {
    try {
      event.preventDefault()
      const username = event.target.username.value
      const password = event.target.password.value
      await API.users.create(username, password)
      
      const theData = Array.isArray(data) ? data : []
      setData([...theData, {username, password}])
      await load()
    } catch (error) {
      console.error(error)
    }
  }
  
  
  const handleDelete = async (username) => {
    try {
      await API.users.remove(username)
      await load()
    } catch (error) {
      console.error(error)
    }
  }
  
  
  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData(event.target)
      const username = formData.get('username')
      const password = formData.get('password')
      
      await API.users.update(username, password)
      await load()
    } catch (error) {
      console.error(error)
    }
    return false
  }
  
  
  const load = async () => {
    try {
      const result = await API.users.read()
      setData(result)
    } catch (error) {
      console.error(error)
    }
  }
  
  
  useEffect(() => {
    load()
    .catch(console.error)
    .finally(() => setLoading(false))
  }, [])
  
  
  function User({username, password}) {
    const [passw, setPassword] = useState(password)
    
    const canEdit = (credentials.username === username) || (credentials.username === 'admin')
    const isAdminRecord = (username === 'admin')
    
    return <li>
      <form onSubmit={handleUpdate}>
        <input type="hidden" name="username" value={username} />
        
        {username}: 
        
        <Password
          disabled={!canEdit} 
          onChange={e => setPassword(e.target.value)}
          value={passw}
        />
        
        {canEdit && 
          <button type="submit">
            {icon.FLOPPY_DISK}
          </button>
        }
      </form>
      
      {(!isAdminRecord && canEdit) && 
        <button onClick={() => handleDelete(username)}>
          {icon.TRASH}
        </button>
      }
    </li>
  }
  
  
  function Main() {
    return <div>
      <ul>
        {Object.entries(data).map(([username, password]) => <User
          key={username}
          username={username}
          password={password}
        />)}
      </ul>
      
      <AddForm onSubmit={handleAdd} />
    </div>
  }
  
  
  return <div>
    {loading && <p>Loading...</p>}
    {data?
      <Main />
    :
      <p>No users found</p>
    }
  </div>
}


function AddForm({onSubmit}) {
  const [showForm, setShowForm] = useState(false)
  
  if (!showForm) {
    return <button onClick={() => setShowForm(true)}>Add New User</button>
  }
  
  return <form onSubmit={onSubmit}>
    <input autoFocus required
      defaultValue=''
      type="text" name="username" placeholder="Username" 
    />
    
    <input required
      defaultValue={Date.now()}
      type="password" name="password" placeholder="Password" 
    />
    
    <button type="submit">
      {icon.CHECKMARK_GREEN}
    </button>
    
    <button type="button" onClick={() => setShowForm(false)}>
      {icon.CHEVRON_LEFT}
    </button>
  </form>
}


function Password({value, onChange, disabled}) {
  const [isVisible, setIsVisible] = useState(false)
  
  const handleClick = () => {
    setIsVisible(true)
    setTimeout(() => setIsVisible(false), 1000)
  }
  
  return (
    <input
      disabled={disabled}
      name="password"
      type={isVisible ? "text" : "password"}
      value={value}
      onClick={handleClick && !disabled ? handleClick : undefined}
      onChange={onChange}
      style={{cursor: 'pointer'}}
    />
  )
}
