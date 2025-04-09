import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export default function ModalComponent({ refreshAuth }) {

  
  const navigate = useNavigate()

  async function logout() {
    const current_token = localStorage.getItem("token")
    await fetch(`http://localhost:8000/auth/logout/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${current_token}`,
      }
    }) 
    localStorage.removeItem("token")
    refreshAuth()
    console.log("signed out")
    navigate("/")
  }

  return (
    <div className='flex flex-col items-center w-24 h-20 bg-palette-white text-palette-gray text-2xl absolute right-0'>
      <div className='h-[50%] hover:cursor-pointer hover:text-palette-pink'>
        Profile
      </div>
      <div 
        className='h-[50%] hover:cursor-pointer hover:text-palette-pink text-palette-red'
        onClick={logout}
      >
        Log Out
      </div>
    </div>
  )
}
