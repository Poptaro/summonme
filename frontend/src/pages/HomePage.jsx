import { Link, useOutletContext } from "react-router-dom"



export default function HomePage() {


  const { user } = useOutletContext()

  return (
    <div className={`flex flex-col items-center h-screen overflow-hidden`}>
      <div className="flex relative justify-center items-center h-1/3 w-full text-palette-white">
        {
          user
          ? <div className="">
              <p className="text-6xl">
                Welcome back {user.username}
              </p>
            </div>
          : <div className="text-4xl">
              Please <Link to="/signup" className="hover:text-palette-pink font-semibold active:text-palette-pink-active">Sign Up</Link> or <Link to="/login" className="hover:text-palette-pink font-semibold active:text-palette-pink-active">Log In</Link>
            </div>
        }
      </div>
      <div className="flex justify-center items-center h-2/5 w-full">
        <div className="flex justify-center items-center text-5xl w-full">
          {/* left */}
        </div>
        <div className="w-full">
          {/* right */}
        </div>
      </div>

      <div className="absolute w-full h-dvh bg-center bg-cover bg-[url(/orn.jpg)] opacity-15 -z-50">

      </div>
    </div>
  )
}
