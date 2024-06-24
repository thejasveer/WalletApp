"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { toast } from "react-toastify";
import { useMessage } from "../hooks/useMessage";
import {z} from 'zod'



export function P2p() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [loading,setLoading] = useState(false)
    const {bark} = useMessage()

    function validate(){
        if(isNaN(amount)||amount<=0){
            bark({message:"please enter a valid amount",success:false})
            return false;
        }
        if(number==""){
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
      const r =     await p2pTransfer(number, Number(amount) * 100)
        bark(r)
        setLoading(false)
     
    }

    return <div className="h-max w-full ">
        
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput  placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput val={amount} placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button loading={loading} onClick={validate}>Send</Button>
                    </div>
                </div>
            </Card>
           
        
    </div>
}