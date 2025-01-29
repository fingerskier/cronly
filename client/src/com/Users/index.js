import {useEffect, useState} from 'react'
import API from 'lib/api'


export default function Users() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    API.users.read()
    .then(setData)
    .catch(console.error)
    .finally(() => setLoading(false))
  }, [])
  
  
  return <div>
    {loading && <p>Loading...</p>}
    {data?.map(user => <p key={user.id}>{user.name}</p>)}
  </div>
}