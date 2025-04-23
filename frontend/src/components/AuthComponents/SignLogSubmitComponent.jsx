

export default function SignLogSubmitComponent({  SL }) {
  return (
    <button className="w-[75%] h-8 text-palette-gray bg-palette-teal rounded-sm hover:bg-teal-500 hover:cursor-pointer">
      {
        SL === "signup"
        ? <p>Sign Up</p>
        : <p>Log In</p>
      }
    </button>
  )
}
