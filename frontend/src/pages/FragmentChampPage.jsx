import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import FragmentBarComponent from '../components/FragmentComponents/FragmentBarComponent'

export default function FragmentChampPage() {

  const [fragmentChamp, setFragmentChamp] = useState(null)
  const [fragmentChampArray, setFragmentChampArray] = useState([])
  

  const { champion_key } = useParams()

  useEffect(() => {
    fetchFragmentChamp(champion_key)
    fetchFragmentChampArray(champion_key)
    console.log("fetching")
  }, [])

  async function fetchFragmentChamp(champion_key) {
    const response = await fetch(`http://localhost:8000/stats/ddragon/${champion_key}/`, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    console.log("FETHCING CHAMP: ", data)
    setFragmentChamp(data)
  }

  async function fetchFragmentChampArray(champion_key) {
    const response = await fetch(`http://localhost:8000/fragments/champion/${champion_key}/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })

    const data = await response.json()
    console.log(data)
    setFragmentChampArray(data)
  }

  async function deleteFragment(fragmentId) {
    try {
      const response = await fetch(`http://localhost:8000/fragments/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          "fragment_id": fragmentId
        })
      })
      if(!response.ok) {
        throw new Error("Failed to delete fragment")
      }
      const filteredArray = fragmentChampArray.filter((champ) => {
        return champ.id !== fragmentId
      })
      setFragmentChampArray(filteredArray)
      console.log("successfully deleted")
    } catch(err) {
      console.log(err)
    }


  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-between items-center w-[90%] h-12'>
        <div className='text-2xl text-palette-orange active:text-palette-red hover:text-palette-orange-hover hover:cursor-pointer'>
          <Link to="/fragments" className=''>Back</Link>
        </div>
        <div className='text-2xl text-palette-teal'>
          {
            fragmentChamp
            ? <Link to={`/fragments/${fragmentChamp.champion_key}/create`}>Add a fragment</Link>
            : null
          }
        </div>
      </div>
      <div className='h-169 w-[90%] overflow-y-auto rounded-md bg-palette-gray inset-shadow-sm inset-shadow-palette-black'>
        {
          fragmentChamp
          ? fragmentChampArray.length
              ? fragmentChampArray.map((frag) => {
                return(
                  <div className='flex justify-center p-2' key={frag.id}>
                    <FragmentBarComponent champion={fragmentChamp} fragment={frag} deleteFrag={deleteFragment}/>
                  </div>
                )
              })
              : <p>No fragments for champ {champion_key}</p>
          : <p>Could not find champ "{champion_key}"</p>
        }

      </div>
    </div>
  )
}
