


export default function ChampionBannerComponent({ champ }) {
  return (
    <div className="flex flex-col border-2 rounded-md border-palette-black w-20 h-32 justify-items-center relative">
      <div 
        className="h-full w-full bg-cover bg-center text-center rounded-md absolute inset-0 text-palette-teal opacity-56 z-0 overflow-hidden"
        style={{ backgroundImage: `url(${champ.champion_loading})` }}  
      />
      
      <div className="flex flex-col h-full justify-end opacity-100 z-10 items-center text-sm text-palette-white">
        <div className="py-1 text-center text-xs">
          {champ.champion_name}
        </div>
      </div>

    </div>
  )
}
