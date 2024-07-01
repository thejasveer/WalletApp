import { Card } from "@repo/ui/card";
import { Transactions } from "../../../components/Transactions";
import { getTrasactions } from "../../lib/actions/getTransactions"
import { PageTitle } from "../../../components/PageTitle";
import { Center } from "@repo/ui/center";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";

export default async function() {
    const session = await getServerSession(authOptions);
       
    if(!session)
        {
         redirect('/signin')
        }  
    const transactions :any= await getTrasactions(-1);


    return <div className=" w-full ">
        <div className="w-full h-full ">
              <PageTitle title="Transactions"/>
         
            <Card title="Transactions">
            <Transactions count={-1} type="transfer" transactions={transactions.rampTransaction}/>   
            </Card> 
 
      
        </div>
      
    </div>
}