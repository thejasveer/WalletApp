import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoney";
import { BalanceCard } from "../../../components/BalanceCard";
import { Transactions } from "../../../components/Transactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { signIn } from "next-auth/react";
import { getBalance } from "../../lib/actions/getBalance";
import { getTrasactions } from "../../lib/actions/getTransactions";
import { redirect } from "next/navigation";
import { PageTitle } from "../../../components/PageTitle";
 
// async function getBalance() {
//     const session = await getServerSession(authOptions);
//     const balance =  await prisma.balance.findFirst({
//         where: {
//             userId: Number(session?.user?.id)
//         }
//     });
//     return {
//         amount: balance?.amount || 0,
//         locked: balance?.locked || 0
//     }
// }

// async function getOnRampTransactions() {
//     const session = await getServerSession(authOptions);
 
//     const txns = await prisma.rampTransaction.findMany({
//         where: {
//             userId: Number(session?.user?.id)
//         },
//         take: 4,
//     });
//     return txns.map((t:any) => ({
//         time: t.startTime,
//         amount: t.amount,
//         status: t.status,
//         provider: t.provider,
//         type:t.type
//     }))
// }

export default async function() {
        const session = await getServerSession(authOptions);
       
        if(!session)
            {
             redirect('/api/auth/signin')
            }  
    const balance :any = await getBalance();
    const transactions:any = await getTrasactions(4);
 
 

    return <div className="w-screen">
       <PageTitle title="Transfer" />
        <div className="flex flex-col p-4">

            <div className="flex gap-2 ">
                <AddMoney   />
                 <BalanceCard  amount={balance.amount} locked={balance.locked} /> 
               
            </div>
            <div>
               
                <div className="pt-4">
               {  <Card title="Recent Transactions">
                 
                 <Transactions type="transfer" transactions={transactions.rampTransaction}/>   
                 
                  </Card> } 
             
                </div>
            </div>
        </div>
    </div>
}