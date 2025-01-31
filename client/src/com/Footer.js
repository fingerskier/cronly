import React from 'react'
import useLocalStorage from 'hook/useLocalStorage'

import logo from 'img/logo192.png'


export default function Footer() {
  const [credentials] = useLocalStorage('credentials', null)
  
  
  return <footer>
    <img src={logo} alt="logo" />
    
    {credentials?.username && <>
      <a href="#ux/users">Users</a>
      <a href="#ux/scripts">Scripts</a>
      <a href="#ux/cron">CRON Jobs</a>
      <a href="#ux/login">Account</a>
    </>}
    
    <img src={logo} alt="logo" />
  </footer>
}