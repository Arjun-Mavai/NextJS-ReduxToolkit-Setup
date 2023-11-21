'use client'
import { useAppSelector } from '@/redux/store'
import LogIn from './log-in'

 

export default function Home() {
  const  { isModerator , username } = useAppSelector((state)=>state.authReducer );
  // const isModerator = useAppSelector((state)=>state.authReducer ;


  return (
    <div className='ml-[50%] relative' >
      <LogIn/>
     <div className='text-2xl flex flex-col absolute top-[40%] left-[40%] mt-10  flex-wrap '>
      <fieldset>
        <legend>Username</legend>
               <h1 className='relative right-20'>  <strong className='text-center text-3xl uppercase bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent' >{username}</strong></h1>

      </fieldset>
      <span className='mr-[50%]'>
        {
        isModerator && <h1>  Moderator</h1>
      }
      </span>
     </div>
    </div>
  )
}
