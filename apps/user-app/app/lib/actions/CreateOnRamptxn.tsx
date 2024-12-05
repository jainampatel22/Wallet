"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { PrismaClient } from "@repo/db";
 export async  function CreateOnRampTrans(amount:number,provider:string){
const session = await getServerSession(authOptions)
const prisma  = new PrismaClient()
const userId = session.user.id
const token = Math.random().toString()
if(!userId){
    return {message:"You are not logged In"}
}
await prisma.onRampTranscation.create({
    data:{
     userId:Number(userId),
     amount:amount,
     status:"Processing",
StartTime:new Date(),
token:token,
provider,


    }
})


}