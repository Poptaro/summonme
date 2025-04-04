import { NavLink } from 'react-router-dom'

export default function NavlinkComponent({ children, path }) {
  return (
    <NavLink 
      to={path} 
      className={
            ({ isActive }) => 
            isActive 
            ? 'text-fuchsia-300 text-2xl' 
            : 'text-palette-white text-2xl'
          }
      >{children}</NavLink>
  )
}
