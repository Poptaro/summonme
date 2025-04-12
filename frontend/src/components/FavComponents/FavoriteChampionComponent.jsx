


// Example object to be passed in
// {
//   champion_id: 157
//   champion_level: 45
//   champion_name: "Yasuo"
//   champion_points: 509286
//   champion_splash: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg"
//   champion_square: "https://ddragon.leagueoflegends.com/cdn/15.7.1/img/champion/Yasuo.png"
//   champion_title: "the Unforgiven"
//   id: 1769
//   user: 1
// }
  
export default function FavoriteChampComponent({ champion }) {
  return (
    <div className='flex flex-col items-center py-2 h-44 w-30 border-1 border-palette-black rounded-md bg-palette-gray text-palette-white inset-shadow-sm inset-shadow-palette-black'>
      <div className=''>
        {champion.champion_name}
      </div>
      <div className='m-2 h-18 w-18 overflow-hidden rounded-full border-palette-teal border-2 relative'>
        <img src={champion.champion_square} className='h-20 w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
      </div>
      <div className='flex flex-col items-center'>
        <div>
          {champion.champion_level}
        </div>
        <div>
          {champion.champion_points}
        </div>
      </div>
    </div>
  )
}
