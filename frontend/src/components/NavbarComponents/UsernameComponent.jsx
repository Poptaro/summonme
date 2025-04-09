import React from 'react'

export default function UsernameComponent({ children }) {
  return (
    <div className='text-palette-white text-2xl hover:cursor-pointer'>
      {children}
    </div>
  )
}
