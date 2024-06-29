"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const session = useSession();
  const router = useRouter();
  if(!session){
    signIn()
  }
  return (

   <div>
      <Appbar onSignin={signIn} onSignout={async () => {
        await signOut()
        router.push("/signin")
      }} user={session.data?.user} />
   </div>
  );
}
