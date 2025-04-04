

export default function SignLogSubmitComponent({  SL }) {
  return (
    <button className="w-[75%] h-8 bg-blue-400 rounded-sm hover:bg-blue-600">
      {
        SL === "signin"
        ? <p>Sign In</p>
        : <p>Log In</p>
      }
    </button>
  )
}
