import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import axios from "axios";
import {signupSchema} from "@repo/schemas/schemas"

export async function POST(req: NextRequest) {
  try {
    const input  = await req.json();

        const {error}= signupSchema.safeParse(input)

        
        if(error){
            return NextResponse.json(
                { message: "Invalid inputs", error:error?.issues,success:false } 
        
            );
        }
         
        const existNumber= await prisma.user.findFirst(({
            where:{
                number:input.number

            }
        }))
        if(existNumber){
            return NextResponse.json(
                { message:"Invalid input", error:[{message:"Please try a different number. It already exist in our records."}],success:false } 
        
            );
        }
        const email= await prisma.user.findFirst(({
            where:{
                email:input.email

            }
        }))
        if(email){
            return NextResponse.json(
                { message:"Invalid input", error:[{message:"Please try a different email. It already exist in our records."}],success:false } 
        
            );
        }
        const hashedPassword = await bcrypt.hash(input.password, 10);
        let user =  await prisma.user.create({
            data: {
                number:input.number,
                password:hashedPassword ,
                email:input.email,
                name:input.name,
                Balance: {
                    create: {
                        amount: 0,
                        locked: 0
                    }
                  },
            }
        });
        
        const netbankingSignupCred= {
            username:user.number,password:input.password
        } 

        const res:any = await axios.post(process.env.NEXT_PUBLIC_SIGNUP_NETBANKING_URL||'',netbankingSignupCred);
         
         user =    await prisma.user.update({
            where:{ id:user.id},
                data: {
                netbankingLoginToken:res.data.token
            }
        });

            if (user) {
        return NextResponse.json(
            { message: "Successfully registered.",success:true },
            
        );
    }
    } catch(e:any) {

        console.error(e.message);
     
    }
 
  
}
