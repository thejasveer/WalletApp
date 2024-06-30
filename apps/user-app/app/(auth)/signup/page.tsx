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
export default function() {

    const [input,setInput] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
        number:""
    });
    const [loading,setLoading]= useState(false)
    const {bark} = useMessage();
 
    const [errors,setErrors] = useState([])
    const router = useRouter()
        const handleSubmit = async ()=>{
            setLoading(true)
            const res:  any = await axios.post('/api/auth/signup',input);
            console.log(res.data)
         
            if(!res.data.success){
                setErrors(res.data.error)
                setLoading(false)
            }else{
                const response = await signIn("credentials", {
                    username: input.number,
                    password: input.password,
                    redirect: false,
                    callbackUrl: "/transfer",
                  });
            
                  if (!response?.error) {
                    bark({message:"Successfully Logged In",success:true});
                    router.push("/transfer");
                    router.refresh();
                    setLoading(false)
                  } else {
                    bark({message: "Unable to login. Please check your registered email and pasword",success:false});
                    setLoading(false)
                 
                  }
            }

          }

    return  <section className="   h-screen">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="text-2xl "> <Logo/></div>
    
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  ">
                  Create an account
              </h1>
              <div className="space-y-4 md:space-y-6"  >
                <div>
                <AuthInput keyStr={"name"} val={input.name} onChange={setInput} 
                label={"Name"}      placeholder={"Enter your name"}/>
                </div>
                  <div>
                      <AuthInput keyStr={"number"} val={input.number}  onChange={setInput} label={"Phone Number"} placeholder={"Enter your phone number"}/>
                   
                  </div>
                  <div>
                  <AuthInput val={input.email} keyStr={"email"}type={"email"} onChange={setInput}  label={"Email"} placeholder={"Enter your Email"}/>
                  </div>
                  <div>
                  <AuthInput val={input.password} keyStr={"password"}type={"password"} onChange={setInput}  label={"Password"} placeholder={"**********"}/>
                  </div>
                  {/* <div>
                  <AuthInput keyStr={"cpassword"}type={"password"} onChange={ setInput} label={"Confirm Password"} placeholder={"**********"}/>
                  </div> */}
                 
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                       
                      </div>
           
                  </div>
                <Button loading={loading} onClick={handleSubmit}>Signup</Button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </div>
              <Errors errors={errors}/>
          </div>
       
      </div>
  </div>
</section>
     
}