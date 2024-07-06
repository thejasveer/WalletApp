"use client"
import { balanceAtom, balanceTriggerAtom } from "@repo/store"
import {  useRecoilValueLoadable, useSetRecoilState } from "@repo/store";
 

export const useBalance =()=>{
 
const balance = useRecoilValueLoadable(balanceAtom)
const balanceTrigger = useSetRecoilState(balanceTriggerAtom)
function resetBalance(){
      
      balanceTrigger(prev=>prev+1)
 
   
}

return {balance,resetBalance};

}