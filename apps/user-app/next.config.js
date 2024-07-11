/** @type {import('next').NextConfig} */
 
module.exports = {
  transpilePackages: ["@repo/ui"],
  output: "standalone",
 
  env:{
    NEXT_PUBLIC_JWT_SECRET:process.env.NEXT_PUBLIC_JWT_SECRET,
    NEXT_PUBLIC_NETBANKING_URL:process.env.NEXT_PUBLIC_NETBANKING_URL,
    NEXT_PUBLIC_SIGNUP_NETBANKING_URL:process.env.NEXT_PUBLIC_SIGNUP_NETBANKING_URL,
    NEXT_PUBLIC_NETBANKING_SECRET:process.env.NEXT_PUBLIC_NETBANKING_SECRET,
    NEXT_PUBLIC_WEBSOCKET_URL:process.env.NEXT_PUBLIC_WEBSOCKET_URL,
    NEXT_PUBLIC_SERVER_WEBHOOK_URL:"ss"//process.env.NEXT_PUBLIC_SERVER_WEBHOOK_URL,
   }
};
