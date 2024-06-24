
import {  atom, selector   } from "recoil";

import { userAtom } from "./user";
 import axios from 'axios'
export const balanceAtom = selector ({
    key:"balanceAtom",
    get:  async ({get}) => {

        const user =  get(userAtom)
      
         get(balanceTriggerAtom)
        if(!user){
            return {
                amount:  0,
                locked:   0
            }
        }else{
            const balance: any =  await axios.get('/api/user/balance');
            return  balance.data
        }
         
      
   
    },
   
    })
 
export const balanceTriggerAtom = atom({
key:"balanceTriggerAtom",
default:0
})