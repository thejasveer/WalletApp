 
import {  atom, selector   } from "recoil";

import { userAtom } from "./user";
 import axios from 'axios'

 export const currBalanceAtom= atom({
    key:"currBalanceAtom",
    default:null
 })

export const balanceAtom = selector ({
    key:"balanceAtom",
    get:  async ({get}) => {
 
         get(balanceTriggerAtom)
        //  const user = get(userAtom)
        // if( user?.id){
         
            const balance: any =  await axios.get('/api/user/balance');
            return  balance.data
        // }else{
        //     return null
        // }
        // return[];
      },
   
    })
 
export const balanceTriggerAtom = atom({
key:"balanceTriggerAtom",
default:0
})