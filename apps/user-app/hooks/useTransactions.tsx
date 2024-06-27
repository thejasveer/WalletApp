import { transactionsAtom, transactionsTriggerAtom } from "@repo/store/src/atoms/transactions"
import {  useRecoilValueLoadable, useSetRecoilState } from "@repo/store";
 

export const useTransactions =(count:number)=>{
const currTransactions = useRecoilValueLoadable(transactionsAtom(count))
const transactionTrigger = useSetRecoilState(transactionsTriggerAtom)
function resetTransactions(){
    
        transactionTrigger(prev=>prev+1)
     
   
}
return {currTransactions,resetTransactions};

}