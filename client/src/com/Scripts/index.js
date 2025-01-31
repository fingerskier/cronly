import {useEffect, useState} from 'react'
import API from 'lib/api'


export default function Scripts() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  
  
  useEffect(() => {
    API.scripts.read()
    .then(setData)
    .catch(console.error)
    .finally(() => setLoading(false))
  }, [])
  
  
  return <div>
    {loading && <p>Loading...</p>}
    {data?.length?
      data?.map(script => <p key={script.id}>{script.name}</p>)
    :
      <p>No scripts found</p>
    }
  </div>
}