"use client"
import { useBalance } from "@repo/store";

import { Card } from "@repo/ui/card";
import {   useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Balance{
    amount:number;
    locked:number
}

export const BalanceCard = ({amount, locked}: {
    
    amount: number;
    locked: number;
 
}) => {
   
    const [balanceToDisplay,setBalance] = useState<Balance>({amount:0,locked:0})
    const {balance}= useBalance();
    useEffect(()=>{
        setBalance(balance)
    },[balance])
  

    // const [balance,setBalance] = useBalance(1)

 

    return <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
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
                {(locked + amount) / 100} CAD
            </div>
        </div>
    </Card>
}