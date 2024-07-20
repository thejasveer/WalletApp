"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
 

export default function Page(): JSX.Element {
  const session = useSession();
 
  const router = useRouter();
  if(!session){
    router.push("/")
  }



  return (

   <div>
      <Appbar onSignin={()=>router.push("/signin")} onLogoClick={()=>!session?router.push("/"): router.push("/transfer")} onSignout={async () => {
        await signOut()
        router.push("/")
     
       
      }} user={session.data?.user} />
   </div>
  );
}
