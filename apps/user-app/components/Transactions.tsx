import { Card } from "@repo/ui/card"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export const Transactions =async({
    transactions,
    type
}: {transactions: any,type:string
}) => {
    const session = await getServerSession(authOptions);
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map((t:any) => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                    {(type=='p2p') ? (t.from==Number(session?.user?.id))?'Transfered':'Recieved': '  Received CAD'}  
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + ${t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}