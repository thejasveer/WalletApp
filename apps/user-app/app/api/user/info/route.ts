import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import { infoScehma } from "@repo/schemas/schemas";
import prisma from "@repo/db/client";
import bcrypt from "bcryptjs";
export async function POST(req: NextRequest) {
    

        const session = await getServerSession(authOptions);
    if (session.user) {
        const input  = await req.json();
  
        const {error}= infoScehma.safeParse(input)

        
        if(error){
            return NextResponse.json(
                { message: "Invalid inputs", error:error?.issues,success:false } 
        
            );
        }
        if(input.password!=null){
            const hashedPassword = await bcrypt.hash(input.password, 10);
             await prisma.user.update(({
                where:{
                    number:input.number
                },
                data: {
                    name:input.name,
                     password:hashedPassword ,
                  }
            }))
         
        }else{
            await prisma.user.update(({
                where:{
                    number:input.number
                },
                data: {
                    name:input.name,
                     
                  }
            }))
        }
     
        return NextResponse.json(
            { message: "Successfully updated the details.",success:true },
            
        );
    }
     
       
    return NextResponse.json( 
        {message: "You are not logged in",success:false}
    )
     
}
 
  