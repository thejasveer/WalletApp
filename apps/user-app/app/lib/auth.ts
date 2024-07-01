import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import { signinSchema } from "../../../../packages/schemas/src/schemas/auth";
 
 
export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Number/Email", type: "text", placeholder: "Enter registered number or email...", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const {error} = signinSchema.safeParse(credentials)
           if(error){
            return null;
           }
            console.log(credentials)
            const existingUser = await db.user.findFirst({
                where: {
                    OR:[{
                        number: credentials.username
                    },{
                        email: credentials.username
                    }]
                }
            });
            console.log(existingUser)
            if (existingUser) {
      
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                console.log(passwordValidation)
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        number: existingUser.number,
                        email:existingUser.email,
                        netbankingLoginToken:existingUser.netbankingLoginToken
                    }
                }
                return null;
            }
            return null
          },
        })
    ],
    secret: process.env.NEXT_PUBLIC_JWT_SECRET ,
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            const user = await db.user.findFirst({
                where: {
                    id:Number(token.sub)
                }
            });
            session.user.id = token.sub
            session.user.number =user?.number
            session.user.name = user?.name
            session.user.email = user?.email
            session.user.netbankingLoginToken = user?.netbankingLoginToken
            return session
        }
    }
  }
  