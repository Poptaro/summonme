import { NavLink } from 'react-router-dom'

export default function NavlinkComponent({ children, path }) {
  return (
    <NavLink 
      to={path} 
      className={
            ({ isActive }) => 
            isActive 
            ? 'text-palette-teal text-2xl' 
            : 'text-palette-white text-2xl hover:text-palette-pink'
          }
      >{children}</NavLink>
  )
}
