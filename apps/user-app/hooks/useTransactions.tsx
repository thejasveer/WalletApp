import { transactionsAtom, transactionsTriggerAtom } from "@repo/store"
import {  useRecoilValueLoadable, useSetRecoilState } from "@repo/store";
import { useCallback, useEffect, useState } from "react";
 

export const useTransactions =(count:number=-1)=>{
   const [fCount,setFCount] = useState(count)     
const currTransactions = useRecoilValueLoadable(transactionsAtom(fCount))
const transactionTrigger = useSetRecoilState(transactionsTriggerAtom)


useEffect(()=>{
      isNaN(count)?setFCount(-1):setFCount(count)
},[fCount])
const resetTransactions= useCallback(()=>{
    
        transactionTrigger((prev:number)=>prev+1)
     
   
},[transactionTrigger])
return {currTransactions,resetTransactions};

}