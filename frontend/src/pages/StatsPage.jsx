import { useOutletContext } from "react-router-dom"
import { useState, useEffect } from "react"



export default function StatsPage() {

  const { user } = useOutletContext()
  const [userChamps, setUserChamps] = useState([])

  useEffect(() => {
    console.log("Stats useEffect")
    const data = fetchUserDDragon()
    setUserChamps(data)
  }, [user])

  async function fetchUserDDragon() {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:8000/stats/riot/`, {
      headers: {
        "Authorization": `Token ${token}`
      }
    })
    const data = await response.json()
    console.log(data)
    return data
  }

  return (
    <div>
      STATS
      {/* {user} */}
    </div>
  )
}
