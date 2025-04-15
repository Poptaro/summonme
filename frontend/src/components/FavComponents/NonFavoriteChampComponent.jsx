



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

export default function NonFavoriteChampComponent({ champion }) {
  return (
    <div className="w-12 h-12 border-2 border-palette-orange rounded-full overflow-hidden relative">
      <img src={champion.ddragon.champion_square} alt={champion.ddragon.champion_name} className="rounded-full h-14 w-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
    </div>
  )
}
