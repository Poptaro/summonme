import { NavLink } from "react-router-dom"

import SignLogBarsComponent from "../components/SignLogInputComponent"
import SignLogSubmitComponent from "../components/SignLogSubmitComponent"

export default function LogInPage() {


  function onSubmit(e) {
    e.preventDefault()
  }

  return (
    <div className='flex items-center justify-center align-center h-dvh pb-20'>
      <div className='flex flex-col items-center justify-around align-center border-2 h-120 w-100'>
        <p className="flex align-center justify-center items-center h-[25%] text-5xl text-palette-white">Log In</p>
        <form onSubmit={(e) => {onSubmit(e)}} className="flex flex-col justify-around h-[75%] w-full items-center align-center">
          <SignLogBarsComponent value="1/2" UP="Username" bottom={false}/>
          <SignLogBarsComponent value="2/2" UP="Password"bottom={true} SL={"login"}/>
          <SignLogSubmitComponent SL="login" onClick={null}/>
        </form>
      </div>
    </div>
  )
}
