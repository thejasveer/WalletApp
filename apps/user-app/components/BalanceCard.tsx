"use client"
 
import { useEffect, useState } from "react";
import { useBalance } from "../hooks/useBalance";
import { useRecoilValue } from "@repo/store";
import { userAtom } from "@repo/store";
import { Loader } from "./Loader";
 
import { Logo } from "@repo/ui/Logo";
 
interface Balance{
    amount:number;
    locked:number
}

export const BalanceCard = ({amount, locked}: {
    
    amount: number;
    locked: number;
 
}) => {
    const user = useRecoilValue(userAtom)
    const [balanceToDisplay,setBalance] = useState<Balance>({amount:amount,locked:locked})

    const {balance} =  useBalance()
 
    useEffect(()=>{
        
         if(balance.state=='hasValue'&& balance.contents){
              setBalance(balance.contents)
       }
        
    },[balance])
    

 

    return <div className="relative lg:w-1/2 w-full mt-10 bg-gradient-to-r from-[#856fb9] to-blue-500 space-y-2 p-5 rounded-2xl text-white">
       
            <div className="z-10">
                <div className="flex z-20 flex-col  justify-between   pb-2">
                    <div className="text-lg font-semibold"  >
                    CAD {balanceToDisplay.amount / 100} 
                    
                    </div>
                    <div className="font-light text-xs">
                    Unlocked Balance  
                    </div>
                </div>
                <div className="flex flex-col  justify-between   pb-2">
                    <div className="text-lg font-semibold "  >
                    CAD {balanceToDisplay.locked / 100} 
                    
                    </div>
                    <div className="font-light text-xs">
                    Locked Balance  
                    </div>
                </div>
                
                <div className="flex items-end justify-between   pb-2">
                <div>
                <div className="text-lg font-semibold"  >
                    CAD {(balanceToDisplay.amount - balanceToDisplay.locked) / 100} 
                    
                    </div>
                    <div className="font-light text-xs">
                    Total Balance
                    </div>
                </div>
                    <div className="font-light ">

                    ({user?"***"+(user?.number)?.toString().substr(6,4):<Loader/>}) 
                      </div>
                </div>
        </div>
        <div className="absolute   flex   before:gap-2 right-4 top-2">
        <img alt="master" className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>

          <Logo/>
       
        </div>
       
    </div>
}