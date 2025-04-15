import React from 'react'
import { Link } from 'react-router-dom'

export default function FragmentsChampPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-between items-center w-[90%] h-20'>
        <div className='text-6xl'>
          <Link to="/fragments">Back</Link>
        </div>
        <div>
          Add a fragment
        </div>
      </div>
      <div className='border-2 h-169 w-[90%] rounded-md bg-palette-gray'>

      </div>
    </div>
  )
}
