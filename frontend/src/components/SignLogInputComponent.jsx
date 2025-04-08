import { NavLink } from "react-router-dom"

export default function SignLogBarsComponent({ value, setter, UP, bottom, SL, passError, userError }) {
  return (
    <div className="w-[60%]">
      {/* UP is either `U`sername or `P`assword */}
      <p className="text-palette-gray">{UP}</p>
      <input 
        value={value}
        onChange={(e) => {setter(e.target.value)}}
        className={`
          border-2 w-full h-8 rounded-sm text-lg items-center justify-center bg-palette-white text-palette-gray 
          ${passError?'border-red-400 focus:border-pink-400 focus:outline-none':''}
          ${userError?'border-red-400 focus:border-pink-400 focus:outline-none':''}
          `}
      />
      {/* dont have an account || already have an account */}
      {/* SL is  either "signup" or "login" to determine the text */}
      {
        bottom
        ? SL === "signup"
          ? <p className="text-palette-gray">Already have an account? <NavLink to="/login" className="text-palette-teal">Log In</NavLink></p>
          : <p className="text-palette-gray">Don't have an account? <NavLink to="/signup" className="text-palette-teal">Sign Up</NavLink></p>
        : null
      }
    </div>
  )
}
