import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            console.log("yes")
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });
              
            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        number: existingUser.number,
                        netbankingLoginToken:existingUser.netbankingLoginToken
                      
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    number: user.number,
                
                   
                }
            } catch(e) {

                console.error(e);
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
            session.user.netbankingLoginToken = user?.netbankingLoginToken
            return session
        }
    }
  }
  