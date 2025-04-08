import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import SignLogBoxComponent from "../components/SignLogBoxComponent"
import SignLogInputComponent from "../components/SignLogInputComponent"
import SignLogSubmitComponent from "../components/SignLogSubmitComponent"

export default function LogInPage() {

  const { refreshAuth } = useOutletContext()
  const navigate = useNavigate()


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
  
  
    async function onSubmit(e) {
      e.preventDefault()

      const isUser = username.length > 16 || username.length < 3
      const isPassword = password.length <=1
  
      setUsernameError(isUser)
      setPasswordError(isPassword)

      // username and password valid
      if(!isUser && !isPassword) {
        try {
          const response = await fetch(`http://localhost:8000/auth/login/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "username": username,
              "password": password,
            })
          })
          if(response.status !== 200) {
            throw new Error("Non-200 login")
          }
          const {token} = await response.json()
          // console.log("token: ", token,"user: ", user)
          localStorage.setItem("token", token)
          refreshAuth()
          navigate('/')

        } catch(error) {
          console.log("failed to log in: ", error)
        }
      }
  
    }

  return (
    <SignLogBoxComponent SL="Log In">
      <form onSubmit={(e) => {onSubmit(e)}} className="flex flex-col justify-around h-[80%] w-full items-center align-center">
        <SignLogInputComponent value={username} setter={setUsername} UP="Username" bottom={false} className="text-palette-gray" userError={usernameError}/>
        <SignLogInputComponent value={password} setter={setPassword} UP="Password"bottom={true} SL={"login"} className="text-palette-gray" passError={passwordError}/>
        <SignLogSubmitComponent SL="login"/>
      </form>
    </SignLogBoxComponent>
  )
}
