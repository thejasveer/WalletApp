
import db from '@repo/db/client';
import express from 'express'
import {RampStatus} from '@prisma/client'
import { bankWebhookSchema } from "@repo/schemas";
import { sendMessage } from '../websocketServer';
 
export const webhookRouter = express.Router();



webhookRouter.post('/bankWebhook',async (req,res)=>{
    const params =req.body;
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
            };
            

            if(txn && payload.status== RampStatus.SUCCESS){
             
               
                if(txn.type=='ON_RAMP'){
                 
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
                                status:payload.status  ,
                            }
                        })
                    ]}); 
                    const message= "Deposit transaction of $"+txn.amount/100+" was successfull."
                    sendMessage(txn.userId,{message:message,"success":true})
                }else{

                    await db.$transaction(async(tx)=>{[
                        await    db.balance.update({
                        where:{userId: txn.userId},
                        data:{
                           amount:{ decrement:txn.amount},
                           locked:{ decrement:txn.amount},
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
              

                  const message= "Withdraw transaction of $"+txn.amount/100+" was successfull."

                  sendMessage(txn.userId,{message:message,"success":true})
                }
                
            }else{
               
            if(txn){
                await db.$transaction([
                
                    db.rampTransaction.update({
                        where: {
                            token: payload.token
                        }, 
                        data: {
                            status:  payload.status,
                        }
                    })
                ]); 
                let status:{title:string,success:boolean}={title:'',success:true};
                const type =txn?.type=='ON_RAMP'?'Deposit':'Withdraw';
                switch(payload.status){
                  case RampStatus.FAILED:
                      status.title='failed.'
                      status.success=false
                      break;
                 case RampStatus.INITIATED:
                     status.title='initiated.'
                     status.success=true
                     break;
                }  
                
                const message= type+" transaction of $"+txn.amount/100+" was "+status.title;
                sendMessage(txn.userId,{message:message,"success": status.success})
            }
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

    

});
 
webhookRouter.post('/sendNotification',async(req,res)=>{
    const data= req.body;
   
    sendMessage(data.userId,{message:data.message,"success":true})
    res.status(200).json({
        message: "Captured"
    })
})