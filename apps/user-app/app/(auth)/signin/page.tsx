"use client"
import { Logo } from "@repo/ui/Logo";
import { Button } from "@repo/ui/button";
import { AuthInput } from "@repo/ui/AuthInput";
import { useEffect, useState } from "react";
import axios from "axios"
import Errors from "../../../components/Errors";
import { signIn } from "next-auth/react";
import { useMessage } from "../../../hooks/useMessage";
import { useRouter } from "next/navigation";
import { Card } from "@repo/ui/card";
export default function() {

    const [input,setInput] = useState({
        username:"",
        password:"",
      
    });
    const [loading,setLoading]= useState(false)
    const {bark} = useMessage();
 
    const [errors,setErrors] = useState([])
    const router = useRouter()
        const handleSubmit = async ()=>{
            setLoading(true)
           
                const response:any = await signIn("credentials", {
                    username: input.username,
                    password: input.password,
                    redirect: false,
                    callbackUrl: "/transfer",
                  });
 
                  if (response?.ok) {
                    bark({message:"Successfully Logged In",success:true});
                    router.push("/transfer");
                    router.refresh();
                    setLoading(false)
                  } else {
                    bark({message: "Unable to login. Please enter valid credentials",success:false});
                     
                    setLoading(false)
                 
                  }
          

          }

    return  <section className="   h-screen">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="text-2xl "> <Logo/></div>
    
      <Card title={"Signin"}>
     
           
              <div className="space-y-4 md:space-y-6"  >
                <div>
                <AuthInput keyStr={"username"} onChange={setInput} 
                label={"Email/Phone Number"}      placeholder={"Enter your email/phone number "}/>
                </div>
                 
                  
                  <div>
                  <AuthInput keyStr={"password"}type={"password"} onChange={setInput}  label={"Password"} placeholder={"**********"}/>
                  </div>
                  {/* <div>
                  <AuthInput keyStr={"cpassword"}type={"password"} onChange={ setInput} label={"Confirm Password"} placeholder={"**********"}/>
                  </div> */}
                 
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                       
                      </div>
           
                  </div>
                <Button loading={loading} onClick={handleSubmit}>Signin</Button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</a>
                  </p>
              </div>
              <Errors errors={errors}/>
        
          </Card>
       
     
  </div>
</section>
     
}