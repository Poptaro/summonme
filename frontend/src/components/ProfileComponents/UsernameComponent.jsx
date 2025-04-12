
export default function UsernameComponent({ title, value }) {
  // Title is the name of the bar
  // Value is the value inside the bar
  // Mutable is a boolean on whether it should be editable or not
  return (
    <div className="p-2">
      <div className="flex flex-col text-xl">
        <p>{title}</p>
        <div className="border-2 rounded-md w-[30%] px-1">{value}</div>
      </div>
    </div>
  )
}
