import { Card } from "@repo/ui/card";
import { Transactions } from "../../../components/Transactions";
import { getTrasactions } from "../../lib/actions/getTransactions"
import { PageTitle } from "../../../components/PageTitle";
import { Center } from "@repo/ui/center";

export default async function() {

    const transactions :any= await getTrasactions();


    return <div className=" w-full ">
        <div className="w-full">
        <PageTitle title="Transactions"/>
         
            <Card title="Transactions">
            <Transactions count={-1} type="transfer" transactions={transactions.rampTransaction}/>   
            </Card> 
 
      
        </div>
      
    </div>
}