import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"

import { Orbit } from 'ldrs/react'
import 'ldrs/react/Orbit.css'

import ChampionBannerComponent from "../components/FragmentComponents/ChampionBannerComponent"


export default function FragmentsPage() {

  const { user } = useOutletContext()

  const [champsArray, setChampsArray] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  

  useEffect(() => {
    grabAllChamps(search)
  }, [search])

  async function grabAllChamps(searchParams) {
    setIsLoading(true)

    const response = await fetch(`http://localhost:8000/stats/ddragon/`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      },
    })
    let data = await response.json()
    if(!searchParams.length) {
      setChampsArray(data)
      setIsLoading(false)
      return
    } else {
      data = data.filter((champ) => {
        return champ.champion_key.toLowerCase().includes(searchParams.toLowerCase())
      })
      setChampsArray(data)
      setIsLoading(false)
      return
    }
  }

  

  
  return (
    <div className='flex flex-col items-center'>
      
      {
        user
        ? <>
            <div className='flex items-center w-[90%] h-12'>
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Champion"
                className="border-2 rounded-md px-1 bg-palette-gray placeholder-palette-black text-palette-white border-palette-black focus:border-palette-white hover:border-palette-orange inset-shadow-sm inset-shadow-palette-black focus:outline-none focus:ring-0"
              />
            </div>
            <div className="w-[90%]">
              <div className='flex flex-wrap gap-1 justify-center p-2 border-2 w-full h-169 bg-palette-gray border-palette-black inset-shadow-sm inset-shadow-palette-black rounded-md overflow-scroll'>
                {
                  isLoading
                  ? <div className="pt-8">
                      <Orbit
                        size="35"
                        speed="1.5"
                        color="white"
                      />
                    </div>
                
                  : champsArray.length
                    ? champsArray.map((champ) => {
                      return(
                        <Link key={champ.champion_id} to={`/fragments/${champ.champion_key}`}>
                          <ChampionBannerComponent champ={champ} />
                        </Link>
                      )
                    })
                    : search.length
                      ? <p>{search} is not found.</p>
                      : <p>No champs.</p>
                  }
              </div>
            </div>
          </>
        : <p className="text-palette-red text-3xl mt-4">Please log in to use this page</p>

      }
      

    </div>
  )
}
