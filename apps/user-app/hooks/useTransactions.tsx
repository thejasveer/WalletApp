import { transactionsAtom, transactionsTriggerAtom } from "@repo/store/src/atoms/transactions"
import {  useRecoilValueLoadable, useSetRecoilState } from "@repo/store";
 

export const useTransactions =()=>{
const currTransactions = useRecoilValueLoadable(transactionsAtom)
const transactionTrigger = useSetRecoilState(transactionsTriggerAtom)
function resetTransactions(){
    transactionTrigger(prev=>prev+1)
}
return {currTransactions,resetTransactions};

}