"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
 
import { useEffect, useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createRampTransaction } from "../app/lib/actions/createRamptxn";
import {  useSession } from "next-auth/react";
 
 
import { useMessage } from "../hooks/useMessage";
import { Pill } from "./Pill";
import { useTransactions } from "../hooks/useTransactions";
import { useBalance } from "../hooks/useBalance";
  
//test edwd

export const AddMoney = () => {
    const session = useSession();
    const user: any = session.data?.user;
    const {bark} = useMessage()

    let [url,setUrl] = useState<string|undefined>();
     const [amount, setAmount] = useState(0);
    
    const [type,setType]= useState<"ON_RAMP" | "OFF_RAMP">("ON_RAMP")
    useEffect(()=>{
        setUrl(process.env.NEXT_PUBLIC_NETBANKING_URL)

    },[])
    const {resetTransactions} = useTransactions(4)
    const {resetBalance} = useBalance()
    function popupWindow(url:string, windowName:string, win:any,w:number, h:number) {
        const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
        const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
        return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`); 
    }

    const validate = ()=>{
        if(isNaN(amount) || amount <=0){
            bark({message:"Please add a valid amount",success:false})
            return false
        }
        openNetbankingPopup()
    }
     const openNetbankingPopup = async()=>{
            const res = await createRampTransaction(type,amount)
            if(!res.success){
                bark({success:res.success,message:res.message})
                return false;
            }
            resetTransactions()
            resetBalance()
            const params = new URLSearchParams({
            paymentToken: res.token,
            token:user.netbankingLoginToken,
            });
            const newWindow = popupWindow(url+'?'+params,"netbank app",window,400,500);
            if (newWindow) {
                // Setting up an interval to check if the window is closed
                const checkWindowClosedInterval = setInterval(() => {
                    if (newWindow.closed) {
                        clearInterval(checkWindowClosedInterval);
                        setAmount(0);
                      }
                }, 1000); // Check every second
            } else {
                bark({message:"Failed to open new window. Please allow pop-ups for this site.",success:false})
                
            }
        }
 

    return <div className="w-full space-y-4">
        <div className="flex gap-3 items-center  text-sm ">
         <Pill title={'Deposit'} selected={type =="ON_RAMP"} onclick={()=>setType("ON_RAMP")} />
           <Pill title={'Withdraw'} selected={type =="OFF_RAMP"} onclick={()=>setType("OFF_RAMP")} />
         </div>
         <Card title="">

            <div className="w-full">
                <TextInput label={"Amount"} placeholder={"Amount"} val={amount} onChange={(val) => {
                   if(!isNaN(val)) setAmount(Number(val))
                }} />
            
                <div className="flex justify-center pt-4">
                    <Button full={true} onClick={validate}>
                   {type=='ON_RAMP'?'Add':'Withdraw'} Money
                    </Button>
                </div>
            </div>
        </Card>
        </div>
       
}

