"use client"
import { RecoilRoot,  userAtom } from "@repo/store";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";
import { useSetRecoilState } from "recoil";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
        <SessionProvider>
             <SessionSyncProvider>{children}</SessionSyncProvider>
         </SessionProvider>
    </RecoilRoot>
}

const SessionSyncProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const session = useSession();
    const currentLoggedInUser = session.data?.user;
    const setCurrentUser = useSetRecoilState(userAtom)
    if(currentLoggedInUser){
        setCurrentUser({
            name:currentLoggedInUser.name,
            email:currentLoggedInUser.email,
            number:currentLoggedInUser.number,
            id:currentLoggedInUser.id,
            netbankingLoginToken:currentLoggedInUser.netbankingLoginToken
        })
    }
 
    return <>{children}</>;
  };
  