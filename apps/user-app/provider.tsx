"use client"
import { RecoilRoot,  userAtom } from "@repo/store";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { redirect, usePathname } from "next/navigation";
export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
        <SessionProvider>
             <SessionSyncProvider>{children}</SessionSyncProvider>
         </SessionProvider>
    </RecoilRoot>
}

const SessionSyncProvider= ({children}: {children: React.ReactNode}) => {
    const { data: session, update } = useSession(  );
    
        const currentLoggedInUser = session?.user;
        
        const setCurrentUser = useSetRecoilState(userAtom)

     
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
            }, [session, setCurrentUser]);
      
       
    
      
        return <>{children}</>;
    

  };
  