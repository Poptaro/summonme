import { useOutletContext } from "react-router-dom"
import { useState } from "react"

import UsernameComponent from "../components/ProfileComponents/UsernameComponent"
import GameTagComboComponent from "../components/ProfileComponents/GameTagComboComponent"
import PUUIDComponent from "../components/ProfileComponents/PUUIDComponent"

export default function ProfilePage() {

  const { user, setUser } = useOutletContext()
  
  const [riotError, setRiotError] = useState(false)
  
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

  return (
    <div className="m-8">
      {
        user
        ? <div className="w-full h-full p-4 bg-palette-gray rounded-md inset-shadow-sm inset-shadow-palette-black text-palette-white">
            <div className="text-4xl p-2">
              Profile
            </div>

            <div className="w-full border-1 border-palette-black"/>

            {/* Not Changeable via user */}
            <UsernameComponent title={"Profile Username"} value={user.username}/>

            {/* User changes this and changes everything else */}
            <GameTagComboComponent user={user} submitFunction={updateRiotId} riotError={riotError} setRiotError={setRiotError}/>

            {/* Not Changeable via user */}
            <PUUIDComponent title={"PUUID"} value={user.puuid} mutable={false}/>

          </div>
        : <div>
            No user
          </div>
      } 
    </div>
  )
}
