import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const Dashboard = () => {
    const {data:session}=useSession()
  return (
<>
{
    session?(
        <>
        <h1>welcome back, {JSON.stringify(session.user)}
            <button onClick={()=>signOut()}>Log out now</button>
        </h1>
        </>
    ):(
        <>
       <h1> welcome new user</h1>
       <button onClick={()=>signIn("google")}>Sign in with google</button>
       <button onClick={()=>signIn("github")}>Sign in with github</button>
        </>
    )
}

</>
  )
}

export default Dashboard