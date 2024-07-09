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
        try {
          const { error } = signinSchema.safeParse(credentials);
          if (error) {
            throw new Error("Validation failed");
          }

          const existingUser = await db.user.findFirst({
            where: {
              OR: [{ number: credentials.username }, { email: credentials.username }]
            }
          });

          if (!existingUser) {
            throw new Error("User not found");
          }

          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          if (!passwordValidation) {
            throw new Error("Invalid password");
          }

          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            number: existingUser.number,
            email: existingUser.email,
            netbankingLoginToken: existingUser.netbankingLoginToken
          };

        } catch (err) {
          console.error("Error in authorize:", err);
          return null;
        }
          },
        })
    ],
    secret: process.env.NEXT_PUBLIC_JWT_SECRET ,
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            try {
                const user = await db.user.findFirst({
                  where: {
                    id: Number(token.sub)
                  }
                });
        
                if (user) {
                  session.user.id = token.sub;
                  session.user.number = user.number;
                  session.user.name = user.name;
                  session.user.email = user.email;
                  session.user.netbankingLoginToken = user.netbankingLoginToken;
                }
        
                return session;
        
              } catch (err) {
                console.error("Error in session callback:", err);
                return session;
              }
        }
    }
  }
  