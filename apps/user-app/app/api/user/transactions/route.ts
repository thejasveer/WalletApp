 
import { NextResponse } from "next/server";
import { getTrasactions } from "../../../lib/actions/getTransactions";

export const GET = async ({id}:{id:number}) => {
 
    const transactions = await getTrasactions();
 
    return NextResponse.json( transactions);
}