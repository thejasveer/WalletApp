 
import { NextResponse } from "next/server";
import { getTrasactions } from "../../../lib/actions/getTransactions";
 
 
export const GET = async (req:any) => {
   
    const { searchParams } = new URL(req.url);
    let count = searchParams.get('count');
    let transactions;
 
    const fCount:number = Number(count)
    if(!isNaN(fCount)){
        transactions = await getTrasactions(Number(count));
    }else{
        transactions = await getTrasactions();
    }
    
   
 
    return NextResponse.json( transactions);
}