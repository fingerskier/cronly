import React from 'react'
import CRON from 'com/CRON'
import Footer from 'com/Footer'
import Login from 'com/Login'
import Scripts from 'com/Scripts'
import Users from 'com/Users'
import useLocalStorage from 'hook/useLocalStorage'
import useSimpleRouter from 'hook/useSimpleRouter'

import './App.css'


export default function App() {
  const [credentials] = useLocalStorage('credentials', null)
  const {Route} = useSimpleRouter()
  
  
  return <>
    <h1>cronly</h1>
    
    <h3>
      {credentials?.username?
        `Welcome ${credentials.username}` : 'Not Logged In'
      }
    </h3>
    
    {credentials?.username && <>
      <Route path="ux">
        <Route path="users" element={<Users />} />
        <Route path="scripts" element={<Scripts />} />
        <Route path="cron" element={<CRON />} />
      </Route>
    </>}
    
    {!credentials?.username && <Login />}
    
    <Footer />
  </>
}