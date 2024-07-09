"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
 
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
 
import { useMessage } from "../hooks/useMessage";
import { useBalance } from "../hooks/useBalance";
import { useTransactions } from "../hooks/useTransactions";
 



export function P2p() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [loading,setLoading] = useState(false)
    const {bark} = useMessage()
    const {resetBalance} = useBalance()
    const {resetTransactions} = useTransactions()
    function validate(){
        if(number==""){
            bark({message:"Please enter a valid peer number",success:false})
            return false;
        }
        if(isNaN(amount)||amount<=0){
            bark({message:"please enter a valid amount",success:false})
            return false;
        }
       
        handleP2pTransfer()
    }

    async function handleP2pTransfer(){
        if(isNaN(amount)){
            bark({message:"please enter a valid amount",success:false})

        }
        setLoading(true)
        const r:any = await p2pTransfer(number, Number(amount) * 100);
       
        bark(r)
        resetBalance()
        resetTransactions()
         setLoading(false)
     
    }

    return <div className="h-max w-full ">
            <Card title="">
                <div className="w-full">
                    <TextInput  placeholder={"Number"} label="Number" onChange={(value) => {
                      if(!isNaN(value))   setNumber(value) 
                    }} />
                    <TextInput val={amount} placeholder={"Amount"} label="Amount" onChange={(value) => {
                      if(!isNaN(value))   setAmount(Number(value))
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button full={true} loading={loading} onClick={validate}>Send</Button>
                    </div>
                </div>
            </Card>
           
        
    </div>
}