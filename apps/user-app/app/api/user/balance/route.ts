import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
 import db from '@repo/db/client'
import { getBalance } from "../../../lib/actions/getBalance";

export const GET = async ({id}:{id:number}) => {
 
    const balance = await getBalance();
 
    return NextResponse.json( balance);
}