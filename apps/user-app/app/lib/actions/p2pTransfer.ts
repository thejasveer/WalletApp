"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

import axios from "axios";
 
export async function p2pTransfer(to: string, amount: number) {
 

    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      throw new Error("Unauthorzed")
    }
    const from = session?.user?.id;
    if (!from) {
        return {
            success:false,
            message: "Error while sending"
        }
    }
    const toUser = await db.user.findFirst({
        where: {
            number: to
        },
        select:{
          id:true,
          Balance:{
            select:{
              amount:true
            }
            }
        }
        
    });

 
    if (!toUser) {
       
        return {
            success:false,
            message: "User not found"
        }
    }
    if(toUser.id==from){
      return {
        success:false,
        message: "You can't transfer money to yourself."
    }
    }
    try {
      await db.$transaction(async (tx :  any) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds. Please add some funds.');
          }
          if (!fromBalance || (fromBalance.amount-fromBalance.locked) < amount) {
            throw new Error('Insufficient funds. $'+fromBalance.locked/100+' is locked due to some pending transaction (Withdrew transactions). Please add some funds.');
          }

          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });
            
          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });
          await tx.p2pTransfer.create({
            data:{
                amount:amount,
                fromUserId:Number(from),
                toUserId:Number(toUser.id),
                timestamp:new Date(),
                balance:fromBalance.amount,
                toBalance:toUser.Balance?.amount
            }
          })
          console.log(process.env.NEXT_PUBLIC_SERVER_WEBHOOK_URL)
          await axios.post(process.env.NEXT_PUBLIC_SERVER_WEBHOOK_URL+'/sendNotification', {
            userId:Number(toUser.id),
            message:"$"+amount/100+" credited to your account."
          });
      });
      await new Promise((resolve)=>{ setTimeout(()=>{resolve("")},3000)})

    return {
      success:true, 
      message:"Transfer successfull"
     }
    } catch (error:any) {
        return {
         success:false, 
         message: error.message
        }
    }
 
}