
import {  selector   } from "recoil";
import db from "@repo/db/client"
import { userAtom } from "./user";
 
export const balanceAtom = selector ({
    key:"myBlogAtom",
    get:  async (prop) => {

        const user = prop.get(userAtom)

        if(!user) return {
            amount:  0,
            locked:   0
        }
      
        // get(MyBlogsTrigger);
        const {id}= user;
        const balance = await db.balance.findFirst({
            where: {
                userId: Number(id)
            }
        });
        return {
            amount: balance?.amount || 0,
            locked: balance?.locked || 0
        }
   
    },
   
    })
 
