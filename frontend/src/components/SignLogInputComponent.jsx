import { NavLink } from "react-router-dom"

export default function SignLogBarsComponent({ value, UP, bottom, SL }) {
  return (
    <div className="w-[60%]">
      {/* UP is either username or password */}
      <p>{UP}</p>
      <input 
        value={value}
        className="border-3 w-full h-8 rounded-sm text-lg items-center justify-center"
      />
      {/* dont have an account || already have an account */}
      {/* SL is  either "signup" or "login" to determine the text */}
      {
        bottom
        ? SL === "signup"
          ? <p>Already have an account? <NavLink to="/login" className="text-palette-white">Log In</NavLink></p>
          : <p>Don't have an account? <NavLink to="/signup" className="text-palette-white">Sign Up</NavLink></p>
        : null
      }
    </div>
  )
}
