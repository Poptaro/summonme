export default function AllItemsArrayComponent({ allItemsArray, itemsArray, setItemsArray }) {

  function addToItems(itemObj) {
    if(itemsArray.length >= 6) {
      return
    }
    if(itemsArray.includes(itemObj)) {
      return
    }
    setItemsArray((prev) => [...prev, itemObj])
  }

  function removeFromItems(itemObj) {
    const temp = [...itemsArray]
    const filtered = temp.filter((item) => {
      return item.item_id !== itemObj.item_id
    })
    setItemsArray(filtered)
  }

  return (
    <>
      {
        allItemsArray
        ? allItemsArray.map((item) => {
          if(itemsArray.some((i) => i.item_id === item.item_id)) {
            return(
              <img src={item.item_icon} key={item.item_id} className="w-10 h-10 hover:cursor-pointer hover:border-2 hover:border-palette-teal rounded-sm border-2 opacity-50" onClick={() => removeFromItems(item)}/>
            )
          }
          return (
            <img src={item.item_icon} key={item.item_id} className="w-10 h-10 hover:cursor-pointer hover:border-2 hover:border-palette-teal rounded-sm border-2" onClick={() => addToItems(item)}/>
          )
        })
        : <p>Loading....</p>
      }
    </>
  )
}
