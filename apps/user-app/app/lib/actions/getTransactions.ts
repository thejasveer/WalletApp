'use server'
import db from '@repo/db/client'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
 

export  const  getTrasactions = async (count:number = -1) => {
 
 try{
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      throw new Error("Unauthorzed")
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
            fromUserId:true,
            toBalance:true
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
            balance:userId== Number(t.fromUserId)?t.balance/100:t.toBalance/100,
            type:userId==t.fromUserId?'OFF_RAMP':'ON_RAMP',
            status:'SUCCESS'
          
        }))}
 }catch(error){
 
    return error;
 }
}