import {useEffect, useState} from 'react'
import API from 'lib/api'


export default function CRON() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  
  
  useEffect(() => {
    API.cron.read()
    .then(setData)
    .catch(console.error)
    .finally(() => setLoading(false))
  }, [])
  
  
  return <div>
    {loading && <p>Loading...</p>}
    {data?.length?
      data?.map(job => <p key={job.id}>{job.name}</p>)
    :
      <p>No CRON jobs found</p>
    }
  </div>
}