import React from 'react'
import useLocalStorage from 'hook/useLocalStorage'


export default function Footer() {
  const [credentials] = useLocalStorage('credentials', null)
  
  
  return <footer>
    {credentials?.username && <>
      <a href="#ux/users">Users</a>
      <a href="#ux/scripts">Scripts</a>
      <a href="#ux/cron">CRON Jobs</a>
    </>}
  </footer>
}