import { useOutletContext, useNavigate, Link } from "react-router-dom"
import { useState } from "react"

import UsernameComponent from "../components/ProfileComponents/UsernameComponent"
import GameTagComboComponent from "../components/ProfileComponents/GameTagComboComponent"
import PUUIDComponent from "../components/ProfileComponents/PUUIDComponent"

export default function ProfilePage() {

  const { user, setUser } = useOutletContext()
  const navigate = useNavigate()
  
  const [riotError, setRiotError] = useState(false)
  const [deleteAccountShield, setDeleteAccountShield] = useState(true)
  
  // console.log(user)
  
  async function updateRiotId(e, gameName, tagLine) {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "game_name": gameName,
          "tag_line": tagLine 
        }) 
      })
      if(!response.ok) {
        throw "Invalid gameName or tagLine"
      }
      const data = await response.json()
      setUser(data)
      console.log("data: --->", data)
    } catch(err) {
      setRiotError(true)
      console.log("error on updating Riot ID: ", err)
    }
  }

  async function submitDelete() {
   if(confirm("Are you sure you want to delete your account?")){
    const response = await fetch(`http://localhost:8000/user/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
    if(!response.ok){
      setDeleteAccountShield(true)
      console.log("Failed to delete own account")
      return
    }
    localStorage.removeItem("token")
    setUser(null)
    navigate("/")
    return

   } else {
    setDeleteAccountShield(true)
    return
   }
  }

  return (
    <div className="m-8">
      {
        user
        ? <div className="w-full h-full p-4 bg-palette-gray rounded-md inset-shadow-sm inset-shadow-palette-black text-palette-white">
            <div className="flex justify-between items-center text-4xl p-2">
              <p>Profile</p>
              <div className="text-palette-red hover:text-palette-pink active:text-palette-pink-active hover:cursor-pointer text-2xl">
                {
                  deleteAccountShield
                  ? <div className="" onClick={() => setDeleteAccountShield(!deleteAccountShield)}>
                      Delete Account
                    </div>
                  : <div onClick={() => submitDelete()}>
                      Confirm Delete
                    </div>
                }
              </div>
            </div>

            <div className="w-full border-1 border-palette-black"/>

            {/* Not Changeable via user */}
            <UsernameComponent title={"Profile Username"} value={user.username}/>

            {/* User changes this and changes everything else */}
            <GameTagComboComponent user={user} submitFunction={updateRiotId} riotError={riotError} setRiotError={setRiotError}/>

            {/* Not Changeable via user */}
            <PUUIDComponent title={"PUUID"} value={user.puuid} mutable={false}/>

          </div>
        : <div className="text-center text-palette-white text-3xl pt-4">
            Please <Link to="/signup" className="text-palette-white hover:text-palette-pink active:text-palette-pink-active font-semibold"> Sign Up </Link> or <Link to="/login" className="text-palette-white hover:text-palette-pink active:text-palette-pink-active font-semibold"> Log In</Link> to manage your profile
          </div>
      } 
    </div>
  )
}
