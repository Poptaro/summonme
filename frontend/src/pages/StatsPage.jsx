import { useOutletContext } from "react-router-dom"
import { useState, useEffect } from "react"

import FavoriteChampComponent from "../components/FavComponents/FavoriteChampionComponent"
import NonFavoriteChampComponent from "../components/FavComponents/NonFavoriteChampComponent"


export default function StatsPage() {

  // Current user logged in
  const { user } = useOutletContext()
  // Champ mastery per user all 160(rokusho case)
  // const [userChamps, setUserChamps] = useState([])
  // Champs to be displayed on screen
  const [favoriteChamps, setFavoriteChamps] = useState([])
  // Champs to be displayed in the non favorites bar
  const [nonFavoriteChamps, setNonFavoriteChamps] = useState([])


  useEffect(() => {
    if (!user || !user.favorite_champs) return;
    console.log("Stats fetchUserDDragon")
    fetchFavs()
  }, [user])

 
  async function fetchUserDDragon() {
    const token = localStorage.getItem("token")
    const response = await fetch(`http://localhost:8000/stats/riot/`, {
      headers: {
        "Authorization": `Token ${token}`
      }
    })
    const data = await response.json()
    return data
  }

  async function createFavChamps(DDragonChamps, favsArray) {
    let temp = []
    let nonFavs = []
    for(let i=0; i<DDragonChamps.length;i++) {
      if(favsArray.includes(DDragonChamps[i].champion_id)) {
        temp.push(DDragonChamps[i])
      } else {
        nonFavs.push(DDragonChamps[i])
      }
    }
    // console.log(temp)
    // console.log(nonFavs)
    setNonFavoriteChamps(nonFavs)
    setFavoriteChamps(temp)
  }

  async function fetchFavs() {
    const DDragon = await fetchUserDDragon()
    // setUserChamps(DDragon)
    if(user){
      await createFavChamps(DDragon, user.favorite_champs)
    }
  }

  // Pass in full copy of useStates above
  // Transmission will be the true/false: true => add to favs
  async function swapFavs(fromArr, toArr, champId, transmission, setFromArr, setToArr) {
    // Payload to send to database on which whole array will be saved as the new fav
    // Create copies of useState arrays
    fromArr = [...fromArr]
    toArr = [...toArr]

    let index = fromArr.findIndex((champ) => {
      return champ.champion_id === champId
    })
    if(index !== -1){
      // Remove champ from fromArr
      const champToAdd = fromArr.splice(index, 1)
      // Add removed champ to toArr
      toArr.push(...champToAdd)
    }

    let payload
    if(transmission) {
      payload = fromArr
    } else {
      payload = toArr
    }

    payload = payload.map((champ) => champ.champion_id)

    fetch(`http://localhost:8000/stats/riot/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        favorite_champs: payload
      })
    })
    setFromArr(fromArr)
    setToArr(toArr)
  }

  return (
    <div className="flex flex-col items-center p-4 gap-1">
      {/* <button onClick={fetchFavs} className="w-[20%] m-2 border-2 rounded-md hover:cursor-pointer">
        Refetch Champs
      </button> */}
      <div className="flex flex-wrap gap-2 justify-center">
        {
          favoriteChamps
          ? favoriteChamps.map((favChamp) => {
            return(
              <div onClick={() => swapFavs(favoriteChamps, nonFavoriteChamps, favChamp.champion_id, true, setFavoriteChamps, setNonFavoriteChamps)} key={favChamp.champion_id}>
                <FavoriteChampComponent champion={favChamp}/>
              </div>
            )
          })
          : <div>
              No favs
            </div>
        }

      </div>
      <div className="my-2">
        {/* Unfavs below */}
      </div>
      <div className="flex flex-wrap justify-center gap-1 border-1 border-palette-black bg-palette-gray p-2 rounded-md inset-shadow-sm inset-shadow-palette-black">
        {
          nonFavoriteChamps
          ? nonFavoriteChamps.map((champ) => {
            return(
              <div onClick={() => swapFavs(nonFavoriteChamps, favoriteChamps, champ.champion_id, false, setNonFavoriteChamps, setFavoriteChamps)} key={champ.champion_id}>
                <NonFavoriteChampComponent champion={champ}/>
              </div>
            )
          })
          : <div>
              No unfavs
            </div>
        }
      </div>
    </div>
  )
}
