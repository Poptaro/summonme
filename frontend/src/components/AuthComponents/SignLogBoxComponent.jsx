import React from 'react'

export default function SignLogBoxComponent({ children, SL }) {
  return (
    <div className='flex items-center justify-center align-center h-dvh pb-20'>
      <div className={`flex flex-col items-center justify-around align-center border-2 ${SL==="Sign Up"?"h-120":""}${SL==="Log In"?"h-90":""} w-100 bg-palette-white rounded-md`}>
        <p className="flex align-center justify-center items-center h-[20%] text-5xl text-palette-gray">{SL}</p>
        {children}
      </div>
    </div>
  )
}
