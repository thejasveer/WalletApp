/** @type {import('next').NextConfig} */
require('dotenv').config({path: __dirname+"/../../.env"});
 
module.exports = {
  transpilePackages: ["@repo/ui"],
 
  env:{
    NEXT_PUBLIC_JWT_SECRET:process.env.NEXT_PUBLIC_JWT_SECRET,
    NEXT_PUBLIC_NETBANKING_URL:process.env.NEXT_PUBLIC_NETBANKING_URL,
    NEXT_PUBLIC_SIGNUP_NETBANKING_URL:process.env.NEXT_PUBLIC_SIGNUP_NETBANKING_URL,
    NEXT_PUBLIC_NETBANKING_SECRET:process.env.NEXT_PUBLIC_NETBANKING_SECRET,
    NEXT_PUBLIC_WEBSOCKET_URL:process.env.NEXT_PUBLIC_WEBSOCKET_URL,
    NEXT_PUBLIC_SERVER_WEBHOOK_URL:process.env.NEXT_PUBLIC_SERVER_WEBHOOK_URL,
   }
};
