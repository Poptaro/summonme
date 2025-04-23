import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


import FragmentRuneComponent from "../components/FragmentComponents/FragmentRuneComponent"
import AllItemsArrayComponent from "../components/FragmentComponents/AllItemsArrayComponent"
import ItemsArrayComponent from "../components/FragmentComponents/ItemsArrayComponent"


export default function FragmentCreationPage() {
  const [fragmentId, setFragmentId] = useState(null)
  // Runes should be Integers
  const [mainRuneId, setMainRuneId] = useState(null)
  const [subRuneId, setSubRuneId] = useState(null)

  const [itemsArray, setItemsArray] = useState([])
  const [description, setDescription] = useState("")

  const [allItemsArray, setAllItemsArray] = useState(null)
  const [allRunesArray, setAllRunesArray] = useState(null)
  const [searchParams, setSearchParams] = useState('')

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { champion_key, fragment_id } = useParams()
  const navigate = useNavigate()

  //if fragment_id in url, edit mode
  useEffect(() => {
    if(fragment_id){
      console.log("Found fragment_id: ", fragment_id)
      //NEED TO CHECK IF FRAGMENT_ID IS A REAL FRAGMENT******************************************* BEFORE SETTING IT AND IT BELONGS TO CURRENT USER
      fetchFragment(fragment_id)
      setFragmentId(fragment_id)
    } else {
      console.log("Fragment not found.")
    }
    setIsLoading(false)
  }, [])

  //Fetch Items and Runes from database
  useEffect(() => {
    fetchAllItems()
    fetchAllRunes()
    console.log("fetching all items and runes effect")
  }, [searchParams])

  // This function will see if the fragment_id is in the database to "edit" is
  async function fetchFragment(fragmentId) {
    try {
      const response = await fetch(`http://localhost:8000/fragments/fragment/${fragmentId}`, {
        headers: {
          "Authorization": `Token ${localStorage.getItem("token")}`
        }
      })
      if(!response.ok) {
        throw new Error("Failed to fetchfragment: ", fragmentId)
      }
      const { items, main_rune, sub_rune, fragment_description} = await response.json()
      console.log("main_rubne", main_rune)
      setItemsArray(items)
      setMainRuneId(main_rune.rune_id)
      setSubRuneId(sub_rune.rune_id)
      setDescription(fragment_description)
    } catch(err) {
      console.log("Error: ", err)
    }
  }

  async function fetchAllItems() {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:8000/fragments/item/`)
      let data = await response.json()
      if(!searchParams.length) {
        setAllItemsArray(data)
      } else {
        data = data.filter((item) => {
          return item.item_name.toLowerCase().includes(searchParams.toLowerCase())
        })

        setAllItemsArray(data)        
      }
    } catch(err) {
      setError(err)
    }
    setIsLoading(false)
  }

  async function fetchAllRunes() {
    try {
      const response = await fetch(`http://localhost:8000/fragments/rune/`)
      const data = await response.json()
      console.log(data)
      setAllRunesArray(data)
    } catch(err) {
      setError(err)
    }
  }

  // Create and Edit fetch
  async function createFragment() {
    setError(null)
    // Items array needs to be item_id instead of whole item object
    const itemize = itemsArray.map((item) => item.item_id)
    let payload = {
      "fragment_id": fragment_id ? fragment_id : null,
      "champion_key": champion_key,
      "items": itemize,
      "main_rune": mainRuneId,
      "sub_rune": subRuneId,
      "fragment_description": description,
    }
    // Determine if creating or updating
    let method = fragment_id ? "PUT" : "POST"
    try {
      const response = await fetch(`http://localhost:8000/fragments/`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      })

      if(!response.ok) {
        setError("Failed to create fragment. Try again.")
        throw new Error("FAILED TO CREATE FRAGMENT")
      }
      const data = await response.json()
      console.log(data)
      navigate(`/fragments/${champion_key}`)
    } catch(err) {
      setError(err)
    }

  }


  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-between items-center w-[90%] h-12 text-2xl'>
        <div className="text-palette-orange active:text-palette-red hover:text-palette-orange-hover hover:cursor-pointer">
          <Link to={`/fragments/${champion_key}`}>Back</Link>
        </div>
        <div>
          {
            fragmentId
            ? <div className="text-palette-teal hover:cursor-pointer active:text-palette-teal-active" onClick={() => createFragment()}>
                Save Fragment
              </div>
            : <div className="text-palette-orange hover:cursor-pointer hover:text-palette-orange-hover active:text-palette-red" onClick={() => createFragment()}>
                Create Fragment
              </div>
          }
        </div>
      </div>
      <div className='flex flex-col items-center h-169 w-[90%] p-4 rounded-md bg-palette-gray inset-shadow-sm inset-shadow-palette-black'>
        <div className="flex flex-col items-center justify-center basis-1/12 mb-2 text-4xl text-palette-white">
          {
            error
            ? <p className="text-palette-red">{error.message}</p>
            : null
          }
          {champion_key} Fragment {fragmentId ? fragmentId : "Creation"}
        </div>
        {/* 1 - 2 */}
        {/* 3 - 3 */}
        <div className="flex flex-col items-center basis-11/12 gap-2 p-2 border-2 overflow-hidden border-palette-black bg-palette-gray rounded-sm w-full inset-shadow-sm inset-shadow-palette-black">
        {/* top boxes */}
          <div className="flex h-1/3 w-full rounded-sm gap-2">
          {/* box 1 */}
            <div className="flex flex-col w-full justify-evenly">

              {/* RUNES START */}
              <div className="flex justify-evenly items-center h-2/5">
                <FragmentRuneComponent allRunesArray={allRunesArray} mainRuneId={mainRuneId} subRuneId={subRuneId} setMainRuneId={setMainRuneId} setSubRuneId={setSubRuneId}/>
              </div>
              {/* RUNES END */}

              {/* ITEMS START */}
              <div className="flex justify-center gap-2 items-center h-2/5 w-full">
                <ItemsArrayComponent itemsArray={itemsArray} setItemsArray={setItemsArray} />
              </div>
              {/* ITEMS END */}

              {/* SEARCH START */}
              <div className="flex items-center justify-center h-1/5">
                <input 
                  value={searchParams}
                  onChange={(e) => setSearchParams(e.target.value)}
                  placeholder="Search"
                  className="border-2 border-palette-black rounded-sm text-palette-white placeholder-palette-black px-1 focus:outline-none focus:ring-0 hover:border-palette-orange focus:border-palette-white"
                />
              </div>
              {/* SEARCH END */}

            </div>
            {/* box 2 */}
            <div className="w-full h-full">
              <p className="h-1/8 text-palette-teal">Description</p>
              <textarea 
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-7/8 px-1 resize-none border-2 text-palette-white rounded-sm border-palette-black focus:outline-none hover:border-palette-orange focus:border-palette-white focus:ring-0"
              />
            </div>
          </div>
          {/* bottom boxes */}
          <div className="flex flex-wrap border-2 border-palette-black h-2/3 w-full rounded-sm justify-center overflow-y-auto gap-1 p-2">
            {
              isLoading 
              ? <p>Loading...</p>
              : <AllItemsArrayComponent allItemsArray={allItemsArray} itemsArray={itemsArray} setItemsArray={setItemsArray} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
