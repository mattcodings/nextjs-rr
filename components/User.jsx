const User = ({userNumber, person, num1, num2, num3, colors}) => {
  return (
    <div className="flex justify-center gap-x-8 mb-2 items-center bg-black p-2 w-[550px] rounded-2xl">
      <label htmlFor="user1" className="text-white">User {userNumber}</label><input type="text" className="border p-2 rounded-2xl bg-black text-white border-black text-2xl w-32" name={`user${userNumber}`}placeholder="Name" defaultValue={person} readOnly/>
      <input type="text" className="border p-2 rounded-2xl h-[45px] w-[45px] text-center" name={`rumbleNum${num1}`} placeholder="1"></input>
      <input type="text" className="border p-2 rounded-2xl h-[45px] w-[45px] text-center" name={`rumbleNum${num2}`} placeholder="2"></input>
      <input type="text" className="border p-2 rounded-2xl h-[45px] w-[45px] text-center" name={`rumbleNum${num3}`} placeholder="3"></input>
      <input type="text" name={`bg-color-${userNumber}`} hidden defaultValue={colors[0]}/>
      <input type="text" name={`text-color-${userNumber}`} hidden defaultValue={colors[1]}/>
    </div>
  )
}
export default User