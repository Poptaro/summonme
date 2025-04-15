import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import ChampionBannerComponent from "../components/FragmentComponents/ChampionBannerComponent"


export default function FragmentsPage() {

  const [champsArray, setChampsArray] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    grabAllChamps(search)
  }, [search])

  async function grabAllChamps(searchParams) {
    const response = await fetch(`http://localhost:8000/stats/ddragon/`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
    })
    let data = await response.json()
    if(!searchParams.length) {
      setChampsArray(data)
      return
    } else {
      data = data.filter((champ) => {
        return champ.champion_key.toLowerCase().includes(searchParams.toLowerCase())
      })
      setChampsArray(data)
      return
    }
  }

  async function submitSearch(){
    null
  }
  
  return (
    <div className='flex flex-col items-center'>
      <form className='flex items-center w-[90%] h-20' onSubmit={() => submitSearch()}>
        <input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 rounded-md m-2 bg-palette-gray text-palette-white"
        />
      </form>
      <div className="w-[90%]">
        <div className='flex flex-wrap gap-1 justify-center p-2 border-2 w-full h-169 bg-palette-gray rounded-md overflow-scroll'>
          {
            champsArray.length
            ? champsArray.map((champ) => {
              return(
                <Link key={champ.champion_id} to={`/fragments/${champ.champion_key}`}>
                  <ChampionBannerComponent champ={champ}/>
                </Link>
              )
            })
            : search.length
              ? <p>{search} is not found.</p>
              :<p>No champs.</p>
            
          }
        </div>
      </div>
    </div>
  )
}
