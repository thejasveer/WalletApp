import { transactionsAtom, transactionsTriggerAtom } from "@repo/store/src/atoms/transactions"
import {  useRecoilValueLoadable, useSetRecoilState } from "@repo/store";
import { useEffect, useState } from "react";
 

export const useTransactions =(count:number=-1)=>{
   const [fCount,setFCount] = useState(count)     
const currTransactions = useRecoilValueLoadable(transactionsAtom(fCount))
const transactionTrigger = useSetRecoilState(transactionsTriggerAtom)


useEffect(()=>{
      isNaN(count)?setFCount(-1):setFCount(count)
},[fCount])
function resetTransactions(){
    
        transactionTrigger(prev=>prev+1)
     
   
}
return {currTransactions,resetTransactions};

}