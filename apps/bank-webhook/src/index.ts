import express from "express";
import cors from 'cors'
import { bankWebhookSchema } from "@repo/schemas/schemas";
import db  from "@repo/db/client";
const app = express();
app.use(cors())
app.use(express.json())
import {RampStatus} from '@prisma/client'
 

app.post('/bankWebhook',async (req,res)=>{
    const params =req.body;
    console.log(params)
    const {success} = bankWebhookSchema.safeParse(params)
    try {
        if(success){
            const payload: {
                token: string;
                status:RampStatus;
            } = {
                token: params.token,
                status: params.status
            };

            const txn= await db.rampTransaction.findFirst({
                where:{
                    token:payload.token
                }
            });

            if(!txn){
                
                res.status(411).json({
                    message: "Transaction not found."
                })
            }

            if(txn && payload.status== 'Success'){
                console.log(payload)
               
                if(txn.type=='ON_RAMP'){
                    console.log(txn)
                    await db.$transaction(async(tx)=>{[
                    
                        await db.balance.update({
                            where:{userId: txn.userId},
                            data:{
                               amount:{ increment:txn.amount}
                            }
                        }),
                        await  db.rampTransaction.update({
                            where: {
                                token: payload.token
                            }, 
                            data: {
                                status:  payload.status,
                            }
                        })
                    ]}); 
                }else{

                    await db.$transaction(async(tx)=>{[
                        await    db.balance.update({
                        where:{userId: txn.userId},
                        data:{
                           amount:{ decrement:txn.amount}
                        }
                    }),
                    await  db.rampTransaction.update({
                        where: {
                            token: payload.token
                        }, 
                        data: {
                            status:  payload.status,
                        }
                    })
                ]}); 
                }
                
            }else{
                await db.$transaction([
                
                db.rampTransaction.update({
                    where: {
                        token: payload.token
                    }, 
                    data: {
                        status: payload.status,
                    }
                })
            ]); 
            }
           
            res.status(200).json({
                message: "Captured"
            })
    
        }else{
            res.status(411).json({
                message: "Invalid Request."
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