"use server";

import  prisma from "@repo/db/client";
import {RampType ,RampStatus}   from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { SignJWT } from "jose";
import { signIn } from "next-auth/react";
import { getBalance } from "./getBalance";


 
export async function createRampTransaction(type: RampType, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)

    const session = await getServerSession(authOptions);
    const balance:any = await getBalance()
    if (!session?.user || !session.user?.id) {
       signIn()
    }
    if(balance.anmount<amount&&type==RampType.OFF_RAMP){
        return {
            success:false,
            token:"",
            message:"You don't have enough funds."
        }
    }else{
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_NETBANKING_SECRET)
        const token = await new SignJWT({
            amount: amount * 100,
            type:type,
          }).setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("100m")
            .sign(secret);
    
        await prisma.rampTransaction.create({
            data: {
                type:type,
                status: RampStatus.INITIATED,
                startTime: new Date(),
                token: token,
                userId: Number(session?.user?.id),
                amount: amount * 100,
                balance:balance.amount
            }
        });
    
        return {
            success:true,
            token:token,
            message:" ",
        }
    }

  
}