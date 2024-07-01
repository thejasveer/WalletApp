import { getServerSession } from "next-auth";
import { P2p } from "../../../components/P2p";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { Transactions } from "../../../components/Transactions";
import { getTrasactions } from "../../lib/actions/getTransactions";
import { Card } from "@repo/ui/card";
import { BalanceCard } from "../../../components/BalanceCard";
import { getBalance } from "../../lib/actions/getBalance";
import { PageTitle } from "../../../components/PageTitle";
import { redirect } from "next/navigation";
 
export default async function(){
    const session = await getServerSession(authOptions);
       
    if(!session)
        {
         redirect('/signin')
        }  
const transactions:any = await getTrasactions(4)
 const balance:any  = await getBalance();
    return   <div className="w-full ">
        <PageTitle title="P2P Transfer" />
        <div className="flex flex-col gap-2  ">
             <div className="  flex flex-col-reverse sm:flex-row gap-5" >

                <P2p/>
                {balance  && <BalanceCard amount={balance.amount} locked={balance.locked}/>}
            
            </div>
            <div className="w-full">
                <Card title="Recent"> <Transactions count={4} type="p2p" transactions={transactions.p2pTransaction}/></Card>

            </div>  
        </div>
    </div> 
}