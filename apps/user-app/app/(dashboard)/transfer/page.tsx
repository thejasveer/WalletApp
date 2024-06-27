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
 

export default async function() {
        const session = await getServerSession(authOptions);
       
        if(!session)
            {
             redirect('/api/auth/signin')
            }  
    const balance :any = await getBalance();
    const transactions:any = await getTrasactions(4);
 
 

    return <div className="w-full">
       <PageTitle title="Transfer" />
        <div className="flex flex-col  ">

            <div className="flex flex-col-reverse sm:flex-row gap-5 ">
                <AddMoney   />
                 <BalanceCard  amount={balance.amount} locked={balance.locked} /> 
               
            </div>
            <div>
               
                <div className="pt-4">
               {  <Card title="Recent Transactions">
                 
                 <Transactions count={4} type="transfer" transactions={transactions.rampTransaction}/>   
                 
                  </Card> } 
             
                </div>
            </div>
        </div>
    </div>
}