"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";
import {z} from 'zod'
export async function p2pTransfer(to: string, amount: number) {

    const session = await getServerSession(authOptions);
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
        message: "You can't tranfer money to yourself."
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
                balance:fromBalance.amount
            }
          })
          return {
            success:true, 
            message:"Transfer successfull"
           }

    });
    } catch (error:any) {
        return {
         success:false, 
         message: error.message
        }
    }
 
}