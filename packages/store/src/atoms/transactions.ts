
import {  atom, selector, selectorFamily   } from "recoil";

import { userAtom } from "./user";
 import axios from 'axios'
export const transactionsAtom = selectorFamily ({
    key:"transactionsAtom",
    get:  (count) => async ({get}) => {
        const user =  get(userAtom)
    
  
            get(transactionsTriggerAtom)
         
    
            const transactions: any =  await axios.get('/api/user/transactions?count='+count);
            return  transactions.data
    
   
   
    },
   
    })
 
export const transactionsTriggerAtom = atom({
key:"transactionsTriggerAtom",
default:0
})