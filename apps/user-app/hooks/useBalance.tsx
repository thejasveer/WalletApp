import { balanceAtom, balanceTriggerAtom } from "@repo/store/src/atoms/balance"
import {  useRecoilValueLoadable, useSetRecoilState } from "@repo/store";
 

export const useBalanace =()=>{
     
const balance = useRecoilValueLoadable(balanceAtom)
const balanceTrigger = useSetRecoilState(balanceTriggerAtom)
function resetBalance(){
     balanceTrigger(prev=>prev+1)
}
return {balance,resetBalance};

}