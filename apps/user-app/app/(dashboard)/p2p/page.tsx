import { getServerSession } from "next-auth";
import { P2p } from "../../../components/P2p";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { Transactions } from "../../../components/Transactions";
async function getP2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where:  {
            OR: [
              { toUserId:Number(session?.user?.id )},
              { fromUserId: Number(session?.user?.id )},
            
            ],
          },
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
       from:t.fromUserId,
       to:t.toUserId,
      
    }))
}
export default async function(){
const transactions = await getP2pTransactions()

    return    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 items-center">
        <div ><P2p/></div>
       <div> <Transactions type="p2p" transactions={transactions}/></div>
    </div>
}