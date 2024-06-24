"use client"
import { Card } from "@repo/ui/card"
import { useEffect, useState } from "react"
import { useRecoilValue, userAtom } from "@repo/store"
import { useTransactions } from "../hooks/useTransactions"
import { Button } from "@repo/ui/button"
import { Center } from "@repo/ui/center"
 

export const Transactions =({
    transactions,
    type,
    
}: {transactions: any,type:string; 
}) => {
 
    const user= useRecoilValue(userAtom);
    const [typeSelected,setTypeSelected] = useState(type)
    const [transactionsToDisplay,setTransacitionsToDisplay] = useState({transactions:transactions,type})

    const {currTransactions,resetTransactions} = useTransactions()


    useEffect(()=>{

        if(type!='p2p'){
            // setTransacitionsToDisplay(currTransactions.p2pTransaction)
    
        }
    },[currTransactions])
   
    console.log(transactionsToDisplay)
    if (!transactionsToDisplay.transactions) {
        return  <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
     
    }


    return   <div className="pt-2 overflow-scroll h-1/2">
            
            {transactionsToDisplay?.transactions.map((t:any,i:number) => <div>
              
              <Transaction 
              heading={t.heading}
              date= {t.date.toDateString()}
              amount={t.amount / 100}
              balance={t.balance}
              type={t.type}
              ></Transaction> 
              
                {/* <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                    {(type=='p2p') ? (t.from==Number(user?.id))?'Transfered':'Recieved': '  Received CAD'}  
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className={`flex flex-col justify-center ${t.type="ON_RAMP"?'text-green-500':''} `}>
                    + ${t.amount / 100}
                </div>

            </div> */}
           
            </div>
            
             )}
             <Center> <Button onClick={()=>0}> View all transactions</Button></Center>
        </div>
   
}

function Transaction({heading,date,amount,balance,type}:{type?:string;heading?:string,date?:string,amount?:number,balance?:number}){


    return  <div className="flex justify-between mb-4">
            <div className="flex gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6a51a6" className="size-8 ">
        <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
        </svg>
        <div className="flex flex-col">
             <div className="text-sm font-semibold">{heading} </div>
              <div className="text-slate-400 text-xs">{date}</div>
        </div>
         </div>
        <div className="flex flex-col text-right">
             <div className="text-slate-600 text-sm font-semibold">{type!='ON_RAMP'?'-':''} {amount} CAD</div>
        <div className="text-slate-400 text-xs">{balance} CAD</div>
        </div>



        </div>
 

}

