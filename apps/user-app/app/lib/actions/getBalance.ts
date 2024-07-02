'use server'
import db from '@repo/db/client'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { signIn } from 'next-auth/react';

export  const  getBalance = async () => {
 try{
    const session = await getServerSession(authOptions);
   
    if (!session) {
       signIn()
    }
 
    const balance = await db.balance.findFirst({
        where:{
            userId:Number(session.user.id)
        },
        select:{
            amount:true,
            locked:true
        }
    })

    return  balance
 }catch(error){
 
    return error;
 }
}