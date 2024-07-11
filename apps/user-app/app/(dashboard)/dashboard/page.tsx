 
import { Dasboard } from "../../../components/Dashboard";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import getConfig from 'next/config'



export default async function () {
    const session = await getServerSession(authOptions);
    const { publicRuntimeConfig: config } = getConfig()
    
    console.log('config:', JSON.stringify(config))
    if(!session)
        {
         redirect('/signin')
        } 
     
    return <Dasboard/>
    }