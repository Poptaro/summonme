import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import NavlinkComponent from './NavlinkComponent'
import UsernameComponent from './UsernameComponent'
import ModalComponent from './ModalComponent'

// import { useOutletContext } from 'react-router-dom'

export default function NavbarComponent({ user, refreshUser }) {


  //Set profileModal to false every refresh
  useEffect(() => {
    setProfileModal(false)
  }, [user])

  const [profileModal, setProfileModal] = useState(false)


  return (
    <nav className='flex flex-col'>
      <div className='flex justify-between bg-palette-black items-center p-3'>
        <div className='flex gap-24 items-center'>
          <div className='hidden md:flex'>
            <NavLink to="/" className={
              ({ isActive }) => 
                isActive 
              ? 'text-palette-teal text-5xl'
              : 'text-palette-white text-5xl hover:text-palette-pink active:text-palette-pink-active'
            }
            >SummonMe</NavLink>
            {/* "text-palette-white text-5xl active:text-red-300"  */}
          </div>
          <div className='flex gap-4'>
            <NavlinkComponent path="/stats">Stats</NavlinkComponent>
            <NavlinkComponent path="/fragments">Fragments</NavlinkComponent>
          </div>
        </div>
        <div className='flex flex-col'>
          {
            user
            ? <div className='relative'>
                <div className="actie:text-palette-pink-active" onClick={() => setProfileModal(!profileModal)}>
                  <UsernameComponent>
                    {
                      user.game_name && user.tag_line
                      ? <p className='hover:text-palette-pink active:text-palette-pink-active flex items-center'><img src={user.icon} className='h-10 mx-2'/>{user.username}@{user.game_name}#{user.tag_line}</p>
                      : <p className='hover:text-palette-pink active:text-palette-pink-active'>{user.username}</p>
                    }
                  </UsernameComponent>
                </div>
                <div className=''>
                  {
                    profileModal
                    ? <ModalComponent refreshUser={refreshUser}/>
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
