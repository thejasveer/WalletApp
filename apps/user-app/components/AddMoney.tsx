"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
 
import { Select } from "@repo/ui/select";
import { useEffect, useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createRampTransaction } from "../app/lib/actions/createOnRamptxn";
import {  useSession } from "next-auth/react";

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

    const [url,setUrl] = useState(process.env.NEXT_PUBLIC_NETBANKING_URL+user?.netbankingLoginToken);
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl||"");
    const [amount, setAmount] = useState(0);
    useEffect(()=>{
       

    },[])

 

        const openNetbankingPopup = ()=>{
             
            console.log(url)
            const features = "height=700,width=700";

            // Open the popup window
            window.open(url, "_blank", features);

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
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setAmount(Number(val))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                if(amount>0&& !isNaN(amount)){
                    await createRampTransaction("ON_RAMP",amount)
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