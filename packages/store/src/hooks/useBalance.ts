import {  useRecoilValue } from "recoil"
import { balanceAtom } from "../atoms/balance"
 
export const useBalance = () => {
   const  balance  = useRecoilValue(balanceAtom);
 
   function getBalance(){
    return balance;
   }
    return {balance,getBalance};
}