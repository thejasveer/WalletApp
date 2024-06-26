'use server'
import db from '@repo/db/client'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { signIn } from 'next-auth/react';

export  const  getTrasactions = async (count:number = -1) => {
 try{
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !session.user?.id) {
       signIn()
    }

    const userId = Number(session.user.id)
    const rampTransaction = await db.rampTransaction.findMany({
        where:{
            userId:userId
        },
        orderBy:{
          id:'desc'
        },
      
        take:(count==-1)?undefined:count
    })
    const p2pTransaction = await db.p2pTransfer.findMany({
        where:  {
            OR: [
              { toUserId:userId},
              { fromUserId: userId},
            
            ],
           },
          select:{
         
            amount:true,
            balance:true,
            timestamp:true,
            toUser:true,
            fromUser:true,
            fromUserId:true
          },
          orderBy:{
            id:'desc'
          },
        
          take:(count==-1)?undefined:count
          
    })
    
    return  {rampTransaction:rampTransaction.map((t:any) => ({
              date  : t.startTime.toDateString(),
              amount: t.amount,
              status: t.status,
              balance: t.balance/100,
              heading:t.type=='OFF_RAMP'?'Withdraw':'Deposit',
              type:t.type, 
             
          })),p2pTransaction:p2pTransaction.map((t:any) => ({
            date: t.timestamp.toDateString(),
            amount:  t.amount,
            heading:userId==Number(t.fromUserId)?("Transfered to "+t.toUser.name):(("Received   from "+t.fromUser.name)),
            balance:t.balance/100,
            type:userId==t.fromUserId?'OFF_RAMP':'ON_RAMP',
            status:'SUCCESS'
          
        }))}
 }catch(error){

    console.log(error)
    return error;
 }
}