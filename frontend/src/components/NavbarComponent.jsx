import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import NavlinkComponent from './NavlinkComponent'
import UsernameComponent from './UsernameComponent'
import ModalComponent from './ModalComponent'

// import { useOutletContext } from 'react-router-dom'

export default function NavbarComponent({ user, refreshAuth }) {


  //Set profileModal to false every refresh
  useEffect(() => {
    setProfileModal(false)
  }, [user])

  const [profileModal, setProfileModal] = useState(false)


  return (
    <nav className='flex flex-col'>
      {/* <h1 className="4xl bg-gray-800 text-white p-2">BANNERRRRRRR</h1> */}
      <div className='flex justify-between bg-palette-black items-center p-3'>
        <div className='flex gap-24 items-center'>
          <div className=''>
            <NavLink to="/" className={
              ({ isActive }) => 
                isActive 
              ? 'text-palette-teal text-5xl' 
              : 'text-palette-white text-5xl hover:text-palette-pink'
            }
            >SummonMe</NavLink>
            {/* "text-palette-white text-5xl active:text-red-300"  */}
          </div>
          <div className='flex gap-4'>
            {/* <NavlinkComponent path="/">Home</NavlinkComponent> */}
            <NavlinkComponent path="/stats">Stats</NavlinkComponent>
          </div>
        </div>
        <div className='flex flex-col'>
          {
            user
            ? <div className='relative'>
                <div className="" onClick={() => setProfileModal(!profileModal)}>
                  <UsernameComponent>
                    {
                      user.game_name && user.tag_line
                      ? <p className='hover:text-palette-pink'>{user.game_name}#{user.tag_line}</p>
                      : <p className='hover:text-palette-pink'>{user.username}</p>
                    }
                  </UsernameComponent>
                </div>
                <div className=''>
                  {
                    profileModal
                    ? <ModalComponent refreshAuth={refreshAuth}/>
                    : null
                  }
                </div>
              </div> 
            : <div className='flex gap-4'>
                <NavlinkComponent path="/signup">Sign Up</NavlinkComponent> 
                <NavlinkComponent path="/login">Log In</NavlinkComponent> 
              </div>
          }
        </div>
      </div>
    </nav>
  )
}
