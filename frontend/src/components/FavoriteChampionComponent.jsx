


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
    <div className='flex flex-col items-center h-44 w-30 border-2 rounded-md bg-palette-white inset-shadow-sm inset-shadow-palette-black'>
      <div className='text-palette-gray'>
        {champion.champion_name}
      </div>
      <div className='m-2 h-20 '>
        <img src={champion.champion_square} className='h-full rounded-full'/>
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
