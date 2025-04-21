
export default function FragmentRuneComponent({ allRunesArray, mainRuneId, subRuneId, setMainRuneId, setSubRuneId }) {

  function addToRunes(runeId) {
    if(mainRuneId && subRuneId) {
      return
    } else if(mainRuneId && !subRuneId) {
      setSubRuneId(runeId)
      return
    } else if(subRuneId && !mainRuneId) {
      setMainRuneId(runeId)
      return
    } else {
      setMainRuneId(runeId)
      return
    }
  }

  function removeFromRunes(runeId) {
    if(mainRuneId === runeId){
      setMainRuneId(null)
    } else if(subRuneId === runeId) {
      setSubRuneId(null)
    }
  }


  return (
    <>
      {
        allRunesArray 
        ? allRunesArray.map((rune) => {
          if(rune.rune_id === mainRuneId){
            return(
              <img src={rune.rune_icon} key={rune.rune_id} className="w-12 h-12 hover:cursor-pointer border-2 p-1 rounded-sm border-palette-white hover:border-palette-red" onClick={() => removeFromRunes(rune.rune_id)}/>
            )
          } else if(rune.rune_id === subRuneId) {
            return(
              <img src={rune.rune_icon} key={rune.rune_id} className="w-12 h-12 hover:cursor-pointer border-2 p-1 rounded-sm border-palette-pink hover:border-palette-red" onClick={() => removeFromRunes(rune.rune_id)}/>
            )
          }
          return (
            <img src={rune.rune_icon} key={rune.rune_id} className="w-12 h-12 hover:cursor-pointer border-2 border-palette-black hover:border-palette-teal rounded-sm opacity-50" onClick={() => addToRunes(rune.rune_id)}/>
          )
        })
        : <p>Loading...</p>
      }
    </>
  )
}
