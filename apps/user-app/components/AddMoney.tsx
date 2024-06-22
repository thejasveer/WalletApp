"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
 
import { Select } from "@repo/ui/select";
import { useEffect, useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createRampTransaction } from "../app/lib/actions/createOnRamptxn";
import {  useSession } from "next-auth/react";
import { SignJWT } from "jose";
const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];


//test edwd

export const AddMoney = () => {
    const session = useSession();
    const user: any = session.data?.user;

    let [url,setUrl] = useState(process.env.NEXT_PUBLIC_NETBANKING_URL);
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl||"");
    const [amount, setAmount] = useState(0);
    useEffect(()=>{
       

    },[])

    const receiveMessage=(event: any)=>{
        if (event.origin !== 'http://localhost:5173') {
            return;
        }
        console.log('Message from new window:', event.data);
    }
    function popupWindow(url:string, windowName:string, win:any,w:number, h:number) {
        const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
        const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
        return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);ß
    }
     const openNetbankingPopup = async()=>{
            const {token} = await createRampTransaction("ON_RAMP",amount)
            const params = new URLSearchParams({
            paymentToken: token,
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
                alert('Failed to open new window. Please allow pop-ups for this site.');
            }
          

        }
      if(!user?.netbankingLoginToken){
        return<Card title="Add Money">
              <Button onClick={async () => {
                openNetbankingPopup()
               
            }}>
                Setup Netbanking
            </Button>
            </Card>
        }

    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} val={amount} onChange={(val) => {
            setAmount(Number(val))
        }} />
       
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                if(amount>0&& !isNaN(amount)){
                    // await createRampTransaction("ON_RAMP",amount)
                    openNetbankingPopup()
                    // window.location.href = redirectUrl || "";
                }else{
                    alert("Please enter a  valid amount")
                }
               
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}