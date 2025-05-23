import { NavLink, useNavigate } from "react-router-dom"


export default function ModalComponent({ refreshUser }) {

  
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
    refreshUser()
    console.log("signed out")
    navigate("/")
  }

  return (
    <div className='flex flex-col items-center z-20 w-24 h-20 bg-palette-gray text-palette-white text-2xl absolute right-0 rounded-sm inset-shadow-sm inset-shadow-palette-black'>
      <div className='h-[50%] hover:cursor-pointer hover:text-palette-pink active:text-palette-pink-active'>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div 
        className='h-[50%] hover:cursor-pointer hover:text-palette-pink text-palette-red active:text-palette-pink-active'
        onClick={logout}
      >
        Log Out
      </div>
    </div>
  )
}
