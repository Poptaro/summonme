

export default function ItemsArrayComponent({ itemsArray, setItemsArray }) {

  function removeFromItems(itemObj) {
    const temp = [...itemsArray]
    const filtered = temp.filter((item) => {
      return item.item_id !== itemObj.item_id
    })
    setItemsArray(filtered)
  }

  return (
    <div className={`flex gap-2 ${itemsArray.length ? "p-2 border-2 rounded-sm border-palette-black" : ''}`}>
      {
        itemsArray.length
        ? itemsArray.map((item) => {
          return(
            <img src={item.item_icon} key={item.item_id} className="w-10 h-10 border-1 border-palette-black rounded-sm hover:cursor-pointer hover:border-palette-red hover:border-2" onClick={() => removeFromItems(item)}/>
          )
        })
        : null
      }
    </div>
  )
}
