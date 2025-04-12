
export default function PUUIDComponent({ value }) {
  return (
    <div className="p-2">
      <div className="flex flex-col text-md">
        <p className='text-xl'>PUUID</p>
        <div className="border-2 rounded-md px-1">
          {value}
        </div>
      </div>
    </div>
  )
}
