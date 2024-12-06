"use server"
import { PrismaClient } from "@repo/db"

import { useSession } from "next-auth/react"
import { authOptions } from "../authOptions"
import { getServerSession } from "next-auth"
const prisma = new PrismaClient();
export async function P2PTrans(to:string,amount:number) {
    const session =await getServerSession(authOptions)
    const from = session?.user?.id;
if(!from){
        return{
            message:"Error while sending"
        }
}
const toUser = await prisma.user.findFirst({
    where:{
        number:to
    },

})
if(!toUser){
    return {
        message:"User not found"
    }
}
await prisma.$transaction(async (tx)=>{
    await tx.$queryRaw `SELECT * FROM "Balance" WHERE "userId"=${Number(from)} FOR UPDATE `;
   const balance = await tx.balance.findUnique({
    where:{
        userId:Number(from)
    }
   })
 if(!balance || balance.amount<amount){
    console.log("Insufficient balance")
    return {
        message:"Insufficient balance"
    }

 }
 await tx.balance.update({
    where:{userId:Number(from)},
    data:{amount:{decrement:amount}}
 })
 await tx.balance.update({
    where:{userId:toUser.id},
    data:{amount:{increment:amount}}
 })
 await tx.p2PTranscation.create({
    data:{
        fromUserId:Number(from),
        toUserId:toUser.id,
        amount,
        StartTime:new Date()
    }
 })
})



}