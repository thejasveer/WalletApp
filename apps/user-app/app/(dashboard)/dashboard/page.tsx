 
import { Dasboard } from "../../../components/Dashboard";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

 

export default async function () {
    const session = await getServerSession(authOptions);
    if(!session)
        {
         redirect('/signin')
        } 
     
    return <Dasboard/>
    }