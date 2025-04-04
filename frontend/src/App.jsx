import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import NavbarComponent from './components/NavbarComponent'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   async function grabCurrentUser() {
  //     const response = await fetch(`http://localhost:8000/user/rokusho/kana/`)
  //     const data = await response.json()
  //     console.log(data)
  //     setUser(data)
  //   }
  //   grabCurrentUser()
  // }, [])


  return (
    <>
      <NavbarComponent currentUser={ user }/>
      <Outlet context={ user }/>
    </>
  )
}

export default App
