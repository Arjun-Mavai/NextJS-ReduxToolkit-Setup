'use client'

import { logIn , logOut , toggleModerator } from '@/redux/features/auth-slice'
import { AppDispatch, useAppSelector } from '@/redux/store'
 
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const LogIn = () => {
    const [username ,setUsername] = useState("")

    const dispatch = useDispatch<AppDispatch>()
    const isAuth = useAppSelector((state)=>state.authReducer.isAuth)
    console.log({isAuth});

     const   onClickLogin = ()=>{
        dispatch(logIn(username))
     }
     const  onClickLogOut = ()=>{ dispatch(logOut())}
     const onClickLogToggle = ()=>{
        dispatch(toggleModerator())
     }
  return (
    <div className='h-screen grid place-items-center  text-2xl '>

<div className="card bg-base-100 shadow-xl flex h-screen items-center justify-center ">
  <figure className="px-10 pt-10 m-10">
    <img src="/reduxtoolkit.jpg" alt="Shoes" className="rounded-xl" />
  </figure>

          <input type="text" placeholder="Type here" onChange={(e)=>setUsername(e.target.value)} className="input input-bordered input-info w-full max-w-xs ml-8 mb-40"  />

  <div className="card-body items-center text-center">
     

     <div className='text-white flex flex-col gap-4 '>
            <button className="btn btn-outline btn-info" onClick={onClickLogin} >Login</button>
         
        <button  className="btn btn-outline btn-success" onClick={onClickLogOut}>Logout</button>
        
       {isAuth &&  <button className="btn btn-outline btn-danger" onClick={onClickLogToggle}>Toggle Moderator Status</button>}
        </div>
      
  </div>
</div>



        

        
        
       
    </div>




  )
}

export default LogIn
