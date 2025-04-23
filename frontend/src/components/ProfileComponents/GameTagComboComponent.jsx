import { useState, useEffect } from "react"



export default function GameTagComboComponent({ user, submitFunction, riotError, setRiotError }) {

  
  const [gameName, setGameName] = useState(user.game_name)
  const [tagLine, setTagLine] = useState(user.tag_line)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    console.log("use effect gametagcombo")
    console.log(hasChanges)
    if(gameName === user.game_name && tagLine === user.tag_line) {
      setHasChanges(false)
    } else {
      setHasChanges(true)
    }
  }, [gameName, tagLine])

  return (
    <>
      <form 
        className="flex w-[80%]"
        onSubmit={(e) => [setHasChanges(false), submitFunction(e, gameName, tagLine), setRiotError(false)]}
      >
        <div className="p-2 pr-0 flex-1">
          <div className="flex flex-col text-xl">
            <p>Game Name</p>
            <input 
              className={`border-2 rounded-md w-[90%] px-1 border-palette-teal hover:border-palette-orange focus:outline-none focus:ring-0 focus:border-palette-white ${riotError ? "border-palette-red": ""}`} 
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
          </div>
        </div>
        <div className="py-2 flex-1">
          <div className="flex flex-col text-xl">
            <p>TagLine</p>
            <div className="flex justify-between">
              <div className="flex w-[70%]">
                <span className="px-2 text-palette-teal">#</span>
                <input 
                  className={`rounded-md w-full px-1 border-2 border-palette-teal focus:outline-none hover:border-palette-orange focus:border-palette-white focus:ring-0 ${riotError ? "border-palette-red": ""}`}
                  value={tagLine}
                  onChange={(e) => setTagLine(e.target.value)}
                  maxLength={5}
                />
              </div>
              <button className="text-palette-orange hover:text-palette-orange-hover active:text-palette-red disabled:text-palette-black" disabled={!hasChanges}>Change</button>
            </div>
          </div>
          {
                riotError
                ? <p className="text-palette-red flex justify-end">Invalid Riot ID Combination</p>
                : null
              }
        </div>
      </form>
    </>
  )
}
