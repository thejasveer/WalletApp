
import {  atom, selector   } from "recoil";

import { userAtom } from "./user";
 import axios from 'axios'
export const transactionsAtom = selector ({
    key:"transactionsAtom",
    get: async ({get}) => {
        const user =  get(userAtom)
    
        if(!user){
            return {}
        }else{
            get(transactionsTriggerAtom)
         
    
            const transactions: any =  await axios.get('/api/user/transactions?count=4');
            return  transactions.data
        }
   
   
    },
   
    })
 
export const transactionsTriggerAtom = atom({
key:"transactionsTriggerAtom",
default:0
})