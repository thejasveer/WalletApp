import {z} from "zod";
import prisma from "@repo/db/client"
export const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
export const signupSchema = z.object({
    name: z.string().min(3,{message:"Name should be ateast 3 characters long"}),
    password:z.string().min(6,{message:"Password should be atleast 6 characters long."}),
    number:z.string().max(10,'Invalid Number!').min(10,'Invalid Number!').regex(phoneRegex, 'Invalid Number!'),
    email : z.string().email({message:"Invalid Email."}).optional()})
 
export type signupSchemaParam = z.infer<typeof signupSchema>
 
export const signinSchema = z.object({
    username: z.string().min(1,{message:"Please enter a valid username."}),
    password:z.string().min(6,{message:"please enter a valid password"}),
  
});
export type signinSchemaParam = z.infer<typeof signinSchema>
 
export const infoScehma = z.object({
    name: z.string().min(3,{message:"Name should be ateast 3 characters long"}).nullable(),
    // password:z.string().min(6,{message:"Password should be atleast 6 characters long."}).nullable(),
    
   })
  
 
export type infoScehmaParam = z.infer<typeof infoScehma>
 