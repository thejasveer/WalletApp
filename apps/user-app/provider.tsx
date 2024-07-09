"use client"
import { RecoilRoot,  useRecoilState,  userAtom } from "@repo/store";
import { SessionProvider,  useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
 
import { useWebSocket } from "./hooks/useWebsocket";
import { useBalance } from "./hooks/useBalance";
 
export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
        <SessionProvider>
             <SessionSyncProvider>
                {children}
              </SessionSyncProvider>
         </SessionProvider>
    </RecoilRoot>
}

const SessionSyncProvider= ({children}: {children: React.ReactNode}) => {
    const { data: session, update } = useSession();
   
    
        const currentLoggedInUser =  session?.user ;
        const [user,setCurrentUser] = useRecoilState(userAtom)
       useWebSocket()
       const {resetBalance}= useBalance()
         useEffect(() => {
            if(currentLoggedInUser){
           
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
          }
        }, [session]);
 return <>{children}</>;
    

  };
  