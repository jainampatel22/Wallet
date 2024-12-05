import express from "express"
import { PrismaClient } from '@repo/db';
const prisma  = new PrismaClient()
const app  =express()

app.use(express.json())
app.post("/hdfcWebhook",async (req,res)=>{
const paymentInformation:{
    token: string;
    userId: string;
    amount: string
} = {
    token:req.body.token,
    userId:req.body.user_Identifier,
    amount:req.body.amount
};
try {
    await prisma.$transaction([
        prisma.balance.updateMany({
            where:{
                userId:Number(paymentInformation.userId)
            },
            data:{
                amount:{
                    increment:Number(paymentInformation.amount)
                }
            }
        }),
        prisma.onRampTranscation.updateMany({
            where:{
                token:paymentInformation.token,
            },
            data:{
                status:"Success",
            }
        })
    ])
    res.json({
        message:"captured"
    })
} catch (error) {
    console.error(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
}

})
app.listen(3003);