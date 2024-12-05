import { Button } from "@repo/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"

const session = useSession()
export default function(){
    return(
        <div className="h-12 w-full text-white px-10 py-5 bg-black flex">
<div>
    Paytm
</div>
<div>
  {
    session?(
        <>
        <Button onClick={()=>signOut}>Log Out</Button>
        </>
    ):(
        <>
          <Button onClick={()=>signIn}>Join Us!</Button>
        </>
    )
  }
</div>
        </div>
    )
}