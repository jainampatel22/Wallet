"use client"
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { stringify } from 'querystring'
import { Button } from '@repo/ui/button'
const Dashboard = () => {
    const {data:session}=useSession()
  return (
<>
{
    session?(
        <>
       <div className=''>
       <Button onClick={()=>signIn}> Log out</Button>
       
       </div>
       
        </>
    ):(
        <>
      
       <Button onClick={()=>signIn}> Join Us !</Button>
        </>
    )
}

</>
  )
}

export default Dashboard