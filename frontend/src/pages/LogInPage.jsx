import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import SignLogBoxComponent from "../components/AuthComponents/SignLogBoxComponent"
import SignLogInputComponent from "../components/AuthComponents/SignLogInputComponent"
import SignLogSubmitComponent from "../components/AuthComponents/SignLogSubmitComponent"

export default function LogInPage() {

  const { refreshUser } = useOutletContext()
  const navigate = useNavigate()


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [error, setError] = useState(false)
  
  
    async function onSubmit(e) {
      e.preventDefault()
      setError(false)

      const isUser = username.length > 16 || username.length < 3
      const isPassword = password.length <=1
  
      setUsernameError(isUser)
      setPasswordError(isPassword)

      if(localStorage.getItem("token")) {
        console.log("already logged in")
        return
      }

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
          refreshUser()
          navigate('/')

        } catch(error) {
          setError(true)
          console.log("failed to log in: ", error)
        }
      }
  
    }

  return (
    <SignLogBoxComponent SL="Log In">
      {
        error
        ? <p className="text-palette-red">An error has ocurred either at signup or server side</p>
        : null
      }
      <form onSubmit={(e) => {onSubmit(e)}} className="flex flex-col justify-around h-[80%] w-full items-center align-center">
        <SignLogInputComponent value={username} setter={setUsername} UP="Username" bottom={false} className="text-palette-gray" userError={usernameError}/>
        <SignLogInputComponent value={password} setter={setPassword} UP="Password"bottom={true} SL={"login"} className="text-palette-gray" passError={passwordError}/>
        <SignLogSubmitComponent SL="login"/>
      </form>
    </SignLogBoxComponent>
  )
}
