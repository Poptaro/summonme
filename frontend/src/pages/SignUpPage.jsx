import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

import SignLogBoxComponent from '../components/SignLogBoxComponent'
import SignLogInputComponent from '../components/SignLogInputComponent'
import SignLogSubmitComponent from "../components/SignLogSubmitComponent"

export default function SignUpPage() {

  const { refreshAuth } = useOutletContext()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)


  async function onSubmit(e) {
    e.preventDefault()

    const isUser = username.length > 16 || username.length < 3
    const isPassword = password !== confirm || password.length <= 1

    setUsernameError(isUser)
    setPasswordError(isPassword)

    // username and password valid
      if(!isUser && !isPassword) {
        try {
          const response = await fetch(`http://localhost:8000/auth/signup/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "username": username,
              "password": password,
            })
          })
          if(response.status !== 201) {
            throw new Error("Non-201 signup")
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
    <SignLogBoxComponent SL="Sign Up">
      <form onSubmit={(e) => {onSubmit(e)}} className="flex flex-col justify-around h-[80%] w-full items-center align-center">
        {/* UP = Username or Password */}
        <SignLogInputComponent value={username} setter={setUsername} UP="Username" bottom={false} className="text-palette-gray" userError={usernameError}/>
        <SignLogInputComponent value={password} setter={setPassword} UP="Password" bottom={false} className="text-palette-gray" passError={passwordError}/>
        <SignLogInputComponent value={confirm} setter={setConfirm} UP="Confirm Password" bottom={true} SL={"signup"} passError={passwordError}/>
        <SignLogSubmitComponent SL="signup"/>
      </form>
    </SignLogBoxComponent>
  )
}
