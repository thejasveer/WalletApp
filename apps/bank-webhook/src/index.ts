import express from "express";

import { bankWebhookSchema } from "@repo/schemas/schemas";
import db from "@repo/db/client";
const app = express();


app.post('/bankWebhook',async (req,res)=>{
    const params =req.body;
    const {success} = bankWebhookSchema.safeParse(params)
    try {
        if(success){
            const paymentInformation: {
                token: string;
                userId: number;
                amount: number
            } = {
                token: params.token,
                userId: params.user_identifier,
                amount: params.amount
            };
            await db.$transaction([
            db.balance.update({
                where:{userId: paymentInformation.userId},
                data:{
                   amount:{ increment:paymentInformation.amount}
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);
            res.status(200).json({
                message: "Captured"
            })
    
        }else{
            res.status(411).json({
                message: "Invalid inputs"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

    

})
const port = 3002
app.listen(port,()=>{
    console.log("Web server running on port "+ port)
})