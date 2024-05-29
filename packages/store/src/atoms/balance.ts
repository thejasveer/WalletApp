
import { atom, atomFamily, selector, selectorFamily } from "recoil";
import db from "@repo/db/client"
 
export const balanceAtom = atomFamily ({
    key:"myBlogAtom",
    default: selectorFamily({
      key:"balanceAtomSelector",
      get: (id: number) => async ({get}) => {
      console.log("aa",id)
        // get(MyBlogsTrigger);
        const balance = await db.balance.findFirst({
            where: {
                userId: id
            }
        });
        return {
            amount: balance?.amount || 0,
            locked: balance?.locked || 0
        }
   
    },
   
    })
  });
