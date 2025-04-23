import { useState } from "react"
import { Link } from "react-router-dom"


import trashIcon from "/trashIcon.png"



export default function FragmentBarComponent({ champion, fragment, deleteFrag }) {

  const [isOpen, setIsOpen] = useState(false)
  const [deleteShield, setDeleteShield] = useState(true)




  return (
    <div className="flex justify-start items-start w-[90%]">
      <div className="flex flex-col w-full select-none overflow-hidden hover:cursor-pointer relative" onClick={() => setIsOpen(!isOpen)}>
        <div className={`flex h-full w-full gap-4 justify-around border-2 border-palette-black py-1 rounded-sm  ${isOpen ? "rounded-b-none" : ""}`}>
          {/* CLICK FOR DESCRIPTION */}
          <div className="flex rounded-sm px-2 py-2 gap-4">
            <div className="gap-4 items-center hidden sm:flex">
              <img src={champion.champion_square} className="h-12 w-12 rounded-sm"/>
              <p className="text-palette-teal text-2xl">{champion.champion_name}</p>
            </div>
            {/* THE BUILD */}
            <div className="flex gap-4">
              {/* RUNES */}
              <div className="hidden md:flex items-center gap-2 px-2">
                {
                  fragment.main_rune
                  ? <img src={fragment.main_rune.rune_icon} className="h-10 w-10 border-2 border-palette-white rounded-sm"/>
                  : <img src="/hotdogsauce.png" className="h-10 w-10 border-2 border-t-palette-red border-r-palette-orange border-b-palette-teal border-l-palette-pink rounded-sm"/>
                }
                {
                  fragment.sub_rune
                  ? <img src={fragment.sub_rune.rune_icon} className="h-8 w-8 border-2 border-palette-pink rounded-sm"/>
                  : <img src="/hotdogsauce.png" className="h-8 w-8 border-2 border-t-palette-red border-r-palette-orange border-b-palette-teal border-l-palette-pink rounded-sm"/>
                }
              </div>
              {/* ITEMS */}
              <div className="h-full flex gap-2 overflow-hidden ">
                {
                  fragment.items
                  ? fragment.items.map((item) => {
                    return (
                      <img src={item.item_icon} className="h-12 w-12 rounded-md" key={item.id}/>
                    )
                  })
                  : <p>No items</p>
                }
              </div>
            </div>
          </div>
            
          
        </div>
        {/* DESCRIPTION PANEL */}
        {
          isOpen
          ? <div className={`flex flex-wrap border-2 border-t-0 rounded-sm ${isOpen ? "rounded-t-none" : ""} px-1 border-palette-black`}>
              {
                fragment.fragment_description
                ? <div className="text-palette-white">
                    {fragment.id}. {fragment.fragment_description}
                  </div>
                : <div className="text-palette-white">
                    No Description
                  </div>
              }
            </div>
          : null
        }

      </div>
      <div className="flex flex-col items-center justify-center gap-2 px-2">
          <Link to={`/fragments/${champion.champion_key}/create/${fragment.id}`} className="flex items-center justify-center h-8 w-8 border-2 p-2 rounded-sm border-palette-black hover:border-palette-orange">
            <p className="text-palette-orange">Edit</p>
          </Link>
          {
            deleteShield
            ? <button 
                onClick={() => setDeleteShield(false)} 
                className="h-8 w-8 border-2 self-center text-center border-palette-black rounded-sm overflow-hidden hover:border-palette-red active:border-red-700 hover:cursor-pointer"
              ><img src={trashIcon} className=""/></button>
            : <button 
                onClick={() => deleteFrag(fragment.id)} 
                className="h-8 w-8 border-2 self-center text-center rounded-sm border-palette-black text-palette-red hover:border-palette-red hover:text-palette-red active:border-red-700 active:text-red-700 hover:cursor-pointer"
              >X</button>
          }
      </div>    
    </div>
  )
}
