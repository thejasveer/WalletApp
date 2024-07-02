import { Avatar } from "./Avatar";
import { Filter } from "./Filter";
import { Logo } from "./Logo";
import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
  
    return <div className="flex justify-between text-[#6a51a6] border-b border-slate-300 px-5 sm:px-12 ">
         <Logo/>
        <div className="flex gap-2 justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
       
         </div>
    </div>
}