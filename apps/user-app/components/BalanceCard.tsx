"use client"
 
 

import { Card } from "@repo/ui/card";
import {   useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useBalanace } from "../hooks/useBalance";

interface Balance{
    amount:number;
    locked:number
}

export const BalanceCard = ({amount, locked}: {
    
    amount: number;
    locked: number;
 
}) => {
   
    const [balanceToDisplay,setBalance] = useState<Balance>({amount:0,locked:0})

    const {balance,resetBalance} =  useBalanace()
    useEffect(()=>{
        let timer:any;


        if(balance.state=='hasValue'){
           timer= setTimeout(() => {
                setBalance(balance.contents)
            }, 2000);
          
 
        }
        return  ()=>clearTimeout(timer)
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