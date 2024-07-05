"use client"
import { RecoilRoot,  UserInterface,  userAtom } from "@repo/store";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useWebSocket } from "./hooks/useWebsocket";
import { useBalance } from "./hooks/useBalance";
 
export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
        <SessionProvider>
             <SessionSyncProvider>
                {children}
               he {process.env.NEXT_PUBLIC_WEBSOCKET_URL }
                </SessionSyncProvider>
         </SessionProvider>
    </RecoilRoot>
}

const SessionSyncProvider= ({children}: {children: React.ReactNode}) => {
    const { data: session } = useSession();
    const router = useRouter()
    
        const currentLoggedInUser =  session?.user ;
        const setCurrentUser = useSetRecoilState(userAtom)
        useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL ,currentLoggedInUser?.id)
       const {resetBalance}= useBalance()
      

     
            useEffect(() => {
                if(session){
                  
                if (currentLoggedInUser) {
             
                    setCurrentUser((prev) => ({
                        ...prev,
                        name: currentLoggedInUser.name,
                        email: currentLoggedInUser.email,
                        number: currentLoggedInUser.number,
                        id: currentLoggedInUser.id,
                        netbankingLoginToken: currentLoggedInUser.netbankingLoginToken
                    }));
                    resetBalance()

                    
                } 
            }else{
             
                setCurrentUser(null)
                // router.push('/signup')
            }
            }, [session]);
      
       
    
      
        return <>{children}</>;
    

  };
  