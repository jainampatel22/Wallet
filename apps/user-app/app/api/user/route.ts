import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import { NextResponse } from "next/server";
export const GET= async ()=>{
try {
    const session:any =await getServerSession(authOptions);
if(session.user){
return NextResponse.json({
    user:session.user
})
}
} catch (error) {
    return NextResponse.json({
        message:"YOU ARE NOT LOGGED IN"
    })
}

}