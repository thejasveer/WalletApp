"use client"
import { RecoilRoot,  UserInterface,  userAtom } from "@repo/store";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { redirect, usePathname } from "next/navigation";
import { useWebSocket } from "./hooks/useWebsocket";
 
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
    const { data: session } = useSession();
    
        const currentLoggedInUser =  session?.user ;
        const setCurrentUser = useSetRecoilState(userAtom)
    useWebSocket("ws://localhost:3002",currentLoggedInUser?.id)
        
      

     
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

                    
                } 
            }else{
             
                setCurrentUser(null)
            }
            }, [session]);
      
       
    
      
        return <>{children}</>;
    

  };
  