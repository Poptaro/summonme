import React from 'react'

export default function HomePage() {
  return (
    <div className='flex h-150'>
      {/* Left Side */}
      <div className='w-[50%] flex justify-center items-center'>
        Left
      </div>
      {/* Right Side */}
      <div className='w-[50%] flex justify-center items-center'>
        Right
      </div>
    </div>
  )
}
