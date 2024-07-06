 
import {  atom, selector   } from "recoil";
 
 import axios from 'axios'

 export const currBalanceAtom= atom({
    key:"currBalanceAtom",
    default:null
 })

export const balanceAtom = selector ({
    key:"balanceAtom",
    get:  async ({get}) => {
 
         get(balanceTriggerAtom)
         const balance: any =  await axios.get('/api/user/balance');
         return  balance.data
    
      },
   
    })
 
export const balanceTriggerAtom = atom({
key:"balanceTriggerAtom",
default:0
})