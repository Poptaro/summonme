import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import NavbarComponent from './components/NavbarComponents/NavbarComponent'
import './App.css'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log("PLEASE DONT BE REPEATING AUTH")
    refreshUser()
  }, [])

  async function refreshUser() {
    const current_token = localStorage.getItem("token")
    if(!current_token) {
      setUser(null)
      return
    }
    //Calls user_app from django(NOT AUTH APP)
    const response = await fetch(`http://localhost:8000/user/`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${current_token}`,
      }
    })
    const data = await response.json()
    setUser(data)
  }

  return (
    <>
      <NavbarComponent user={user} refreshUser={refreshUser}/>
      <Outlet context={{refreshUser, user, setUser}}/>
    </>
  )
}

export default App
