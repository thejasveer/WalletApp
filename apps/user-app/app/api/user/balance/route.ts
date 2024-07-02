 
import { NextResponse } from "next/server";
 
import { getBalance } from "../../../lib/actions/getBalance";

export const GET = async (  ) => {


    const balance = await getBalance();
 
    return NextResponse.json( balance);
}