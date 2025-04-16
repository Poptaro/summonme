import { useState } from "react"



export default function FragmentBarComponent({ champion, fragment, deleteFrag }) {

  const [isOpen, setIsOpen] = useState(false)



  return (
    <div className="flex flex-col w-[90%] select-none">
      <div className={`flex justify-around border-2 border-palette-black py-1 rounded-sm hover:cursor-pointer ${isOpen ? "rounded-b-none" : ""}`}  onClick={() => setIsOpen(!isOpen)}>
        <div className="flex gap-4 items-center">
          <img src={champion.champion_square} className="h-12 w-12 rounded-sm"/>
          <p className="text-palette-teal text-2xl">{champion.champion_name}</p>
        </div>
        {/* THE BUILD */}
        <div className="flex gap-4">
          {/* RUNES */}
          <div className="h-full flex items-center gap-2 px-2">
            <img src={fragment.main_rune.rune_icon}/>
            <img src={fragment.sub_rune.rune_icon}/>
          </div>
          {/* ITEMS */}
          <div className="h-full flex gap-2 px-2">
            {
              fragment.items
              ? fragment.items.map((item) => {
                return (
                  <img src={item.item_icon} className="h-12 w-12 border-2 border-palette-gray rounded-md" />
                )
              })
              : <p>No items</p>
            }
          </div>
        </div>
        {/* DELETE BUTTON */}
        <button onClick={() => deleteFrag(fragment.id)} className="h-8 w-8 border-2 self-center text-center border-palette-red text-palette-red hover:cursor-pointer active:text-red-300">X</button>
      </div>
      {/* DESCRIPTION PANEL */}
      {
        isOpen
        ? <div className={`border-2 border-t-0 rounded-sm ${isOpen ? "rounded-t-none" : ""} px-1 border-palette-black`}>
            {
              fragment.fragment_description.length
              ? <div className="text-palette-white">
                  {fragment.fragment_description}
                </div>
              : <div>
                  No Description
                </div>
            }
          </div>
        : null
      }

    </div>
  )
}
