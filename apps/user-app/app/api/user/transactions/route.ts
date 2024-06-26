 
import { NextResponse } from "next/server";
import { getTrasactions } from "../../../lib/actions/getTransactions";
 
 
export const GET = async (req:any) => {
   
    const { searchParams } = new URL(req.url);
    const count = searchParams.get('count');
    let transactions;
    if(count){
        transactions = await getTrasactions(Number(count));
    }else{
        transactions = await getTrasactions();
    }
    
   
 
    return NextResponse.json( transactions);
}