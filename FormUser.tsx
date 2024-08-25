import { useState } from "react";


function FormUser(){
  const [users,setUsers] = useState([
    {id:1,title:'First user'},
    {id:2,title:'secont user'},
    {id:3,title:'third user'}
  ])
  const [title,setTitle] = useState('')

  function addNewUser(e){
    e.preventDefault()
    const newUser ={
      id:Date.now(),
      title:'value'
    }
setUsers([...users,newUser])
  }
  return(
<form>
  <input className="
  bg-gray-900
  text-white 
  w-[100%] 
  h-[35px] p-2 
  hover:ring-2 
  hover:ring-amber-200 
  rounded-sm 
  "
  value={title}
  onChange={(e)=> setTitle(e.target.value)}
  type='text' 
  placeholder="New User..."/>
  <br />
  <button className="
  bg-gray-800 
  w-[100%] h-[30px] 
  hover:ring-2 
  hover:ring-amber-200 
  rounded-sm 
  mt-1" 
  onClick={addNewUser}>Save</button>
</form>
  )
}

export default FormUser;