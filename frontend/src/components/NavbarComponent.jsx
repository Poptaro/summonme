import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import NavlinkComponent from './NavlinkComponent'

// import { useOutletContext } from 'react-router-dom'

export default function NavbarComponent({ currentUser }) {

  // const user = useOutletContext()

  return (
    <nav className='flex flex-col'>
      {/* <h1 className="4xl bg-gray-800 text-white p-2">BANNERRRRRRR</h1> */}
      <div className='flex justify-between bg-palette-gray items-center p-3'>
        <div className='flex gap-24 items-center'>
          <div className=''>
            <NavLink to="/" className={
              ({ isActive }) => 
                isActive 
              ? 'text-fuchsia-300 text-5xl' 
              : 'text-palette-white text-5xl'
            }
            >SummonMe</NavLink>
            {/* "text-palette-white text-5xl active:text-red-300"  */}
          </div>
          <div className='flex gap-4'>
            {/* <NavlinkComponent path="/">Home</NavlinkComponent> */}
            <NavlinkComponent path="/stats">Stats</NavlinkComponent>
          </div>
        </div>
        <div className=''>
          {
            currentUser
            ? <p>{currentUser.game_name}#{currentUser.tag_line}</p>
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
