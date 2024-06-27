"use client"
 
 

import { Card } from "@repo/ui/card";
 
import { useEffect, useState } from "react";
import { useBalance } from "../hooks/useBalance";
 
interface Balance{
    amount:number;
    locked:number
}

export const BalanceCard = ({amount, locked}: {
    
    amount: number;
    locked: number;
 
}) => {
   
    const [balanceToDisplay,setBalance] = useState<Balance>({amount:amount,locked:locked})

    const {balance,resetBalance} =  useBalance()
 
    useEffect(()=>{
        
         if(balance.state=='hasValue'){
            setBalance(balance.contents)
    
        }
        
    },[balance])
    

 

    return <div className="w-full mt-10"> <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div onClick={resetBalance} >
                Unlocked balance  
            </div>
            <div>
                {balanceToDisplay.amount / 100} CAD
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Total Locked Balance
            </div>
            <div>
                {balanceToDisplay.locked / 100} CAD
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Total Balance
            </div>
            <div>
                {(balanceToDisplay.locked + balanceToDisplay.amount) / 100} CAD
            </div>
        </div>
    </Card></div>
}